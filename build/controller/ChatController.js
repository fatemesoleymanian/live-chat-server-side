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
const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const MessageModel = require('../models/MessageModel');
const { StatusCodes } = require('http-status-codes');
const accessChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ success: false, msg: 'User id needed!' });
    }
    let isChat = ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.userId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("lastMessage");
    isChat = yield UserModel.populate(isChat, {
        path: "lastMessage.sender",
        select: "name email"
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        let chatData = {
            name: `${req.body.name} & ${req.user.name}`,
            isGroupChat: false,
            users: [req.user.userId, userId]
        };
        try {
            const createdChat = yield ChatModel.create(chatData);
            const fullChat = yield ChatModel.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(StatusCodes.OK).send(fullChat);
        }
        catch (error) {
            res.status(StatusCodes.BadRequest);
            throw new Error(error.message);
        }
    }
});
const fetchChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ChatModel.find({ users: { $elemMatch: { $eq: req.user.userId } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 })
            .then((results) => __awaiter(void 0, void 0, void 0, function* () {
            results = yield UserModel.populate(results, {
                path: "lastMessage.sender",
                select: "name email"
            });
            res.status(StatusCodes.OK).send(results);
        }));
    }
    catch (error) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message);
    }
});
const fetchGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGroups = yield ChatModel.where("isGroupChat").equals(true);
        res.status(StatusCodes.OK).send(allGroups);
    }
    catch (error) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message);
    }
});
const createGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        return res.status(StatusCodes.BadRequest).send({ message: "name of the group nedded!" });
    }
    let users = JSON.parse(req.body.users);
    console.log(users);
    try {
        const groupChat = yield ChatModel.create({
            name: req.body.name,
            users: users,
            groupAdmin: req.user.userId,
            isGroupChat: true
        });
        const fullGroupChat = yield ChatModel.findOne({
            _id: groupChat._id
        }).populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(StatusCodes.OK).send(fullGroupChat);
    }
    catch (error) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message);
    }
});
const leaveGroupOrClearChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const isAChat = yield ChatModel.findById(chatId);
    if (isAChat.isGroupChat) {
        const removed = yield ChatModel.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, {
            new: true
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        if (!removed) {
            res.status(StatusCodes.BadRequest);
            throw new Error("Chat not found");
        }
        else {
            res.status(StatusCodes.OK).send(removed);
        }
    }
    else {
        const removed = yield MessageModel.deleteMany({ chat: chatId });
        if (!removed) {
            res.status(StatusCodes.BadRequest);
            throw new Error("Chat not found");
        }
        else {
            res.status(StatusCodes.OK).send(removed);
        }
    }
});
const addSelfToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const added = yield ChatModel.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, {
        new: true
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(StatusCodes.BadRequest);
        throw new Error("Chat not found");
    }
    else {
        res.status(StatusCodes.OK).send(added);
    }
});
module.exports = {
    accessChat,
    fetchChats,
    fetchGroups,
    leaveGroupOrClearChat,
    createGroupChat,
    addSelfToGroup
};
//# sourceMappingURL=ChatController.js.map