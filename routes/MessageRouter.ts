import express, { Router } from 'express';
const router: Router = express.Router();
const { createMessage, fetchMessagesOfChat } = require('../controller/MessageController')

router.post('/', createMessage);
router.get('/:chatId', fetchMessagesOfChat)


module.exports = router