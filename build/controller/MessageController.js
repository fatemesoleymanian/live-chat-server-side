"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel = require('../models/MessageModel');
const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const { StatusCodes } = require('http-status-codes');
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(400).send("type sth or choose a chat!");
    }
    let newMessage = {
        sender: req.user.userId,
        content: content,
        chat: chatId
    };
    try {
        let message = yield MessageModel.create(newMessage);
        message = yield message.populate("sender", "name");
        message = yield message.populate("chat");
        message = yield message.populate("reciever");
        message = yield UserModel.populate(message, {
            path: "chat.users",
            select: "name email"
        });
        yield ChatModel.findByIdAndUpdate(req.body.chatId, {
            lastMessage: message
        });
        res.status(StatusCodes.OK).send(message);
    }
    catch (error) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message);
    }
});
const fetchMessagesOfChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield MessageModel.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat");
        res.status(StatusCodes.OK).json(messages);
    }
    catch (error) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message);
    }
});
module.exports = { createMessage, fetchMessagesOfChat };
//# sourceMappingURL=MessageController.js.map