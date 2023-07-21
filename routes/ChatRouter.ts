import express, { Router } from 'express';
const router: Router = express.Router();
const { accessChat, fetchChats, fetchGroups, createGroupChat, leaveGroupOrClearChat, addSelfToGroup } = require('../controller/ChatController')

router.post('/', accessChat);
router.get('/', fetchChats);
router.get('/groups', fetchGroups);
router.post('/group', createGroupChat);
router.put('/leave-group', leaveGroupOrClearChat);
router.put('/add-member', addSelfToGroup)


module.exports = router;