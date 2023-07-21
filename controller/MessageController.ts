import { Response, Request } from 'express';
const MessageModel = require('../models/MessageModel')
const UserModel = require('../models/UserModel')
const ChatModel = require('../models/ChatModel')
const { StatusCodes } = require('http-status-codes');

interface RequestCustom extends Request {

    user: {
        userId: string,
        name: string
    }
}

const createMessage = async (req: RequestCustom, res: Response) => {

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        res.status(400).send("type sth or choose a chat!")
    }

    let newMessage = {
        sender: req.user.userId,
        content: content,
        chat: chatId
    }


    try {
        let message = await MessageModel.create(newMessage);
        message = await message.populate("sender", "name");
        message = await message.populate("chat")
        message = await message.populate("reciever")
        message = await UserModel.populate(message, {
            path: "chat.users",
            select: "name email"
        });

        await ChatModel.findByIdAndUpdate(req.body.chatId, {
            lastMessage: message
        });
        res.status(StatusCodes.OK).send(message)

    } catch (error: any) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message)
    }

}

const fetchMessagesOfChat = async (req: Request, res: Response) => {
    try {
        const messages = await MessageModel.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat");
        res.status(StatusCodes.OK).json(messages)

    } catch (error: any) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message)
    }
}

module.exports = { createMessage, fetchMessagesOfChat }