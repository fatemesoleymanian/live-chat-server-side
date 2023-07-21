"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { accessChat, fetchChats, fetchGroups, createGroupChat, leaveGroupOrClearChat, addSelfToGroup } = require('../controller/ChatController');
router.post('/', accessChat);
router.get('/', fetchChats);
router.get('/groups', fetchGroups);
router.post('/group', createGroupChat);
router.put('/leave-group', leaveGroupOrClearChat);
router.put('/add-member', addSelfToGroup);
module.exports = router;
