"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChatSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide chat name.']
    },
    isGroupChat: {
        type: Boolean,
        required: [true, 'Please provide type of chat.']
    },
    users: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'User',
        }],
    groupAdmin: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
    },
    lastMessage: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Message',
    }
}, {
    timestamps: true
});
module.exports = mongoose_1.default.model('Chat', ChatSchema);
