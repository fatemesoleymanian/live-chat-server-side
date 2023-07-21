"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors({
    origin: "*"
})); // Use this after the variable declaration
//connect to db
const connectDB = require('./DB/connect');
//routers
const ChatRouter = require('./routes/ChatRouter');
const UserRouter = require('./routes/UserRouter');
const MessageRouter = require('./routes/MessageRouter');
//Middlewares
// const notFoundMiddleware = require('./middleware/NotFoundMiddleware');
// const errorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware');
const userMiddleware = require('./middleware/UserMiddleware');
const chatMiddleware = require('./middleware/ChatMiddleware');
const authMiddleware = require('./middleware/AuthenticationMiddleware');
app.use(express_1.default.json());
try {
    connectDB(process.env.MONGO_URI);
}
catch (error) {
    console.log(error);
}
app.get('/', (req, res) => {
    res.send('<h1>Live chat API here!!</h1>');
});
app.use('/api/v1/chat', authMiddleware, ChatRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/message', authMiddleware, MessageRouter);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is listening on port ${port}...`));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    },
    pingTimeout: 60000
});
io.on("connection", (socket) => {
    console.log('connection is established...');
    socket.on("setup", (user) => {
        socket.join(user._id);
        console.log('user socket');
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log('room socket ' + room);
    });
    socket.on("new message", (newMessageStatus) => {
        console.log('new message');
        let chat = newMessageStatus.data.chat;
        if (!chat.users) {
            return console.log("chat.users not defiened!");
        }
        chat.users.forEach((user) => {
            if (user._id == newMessageStatus.data.sender._id)
                return;
            socket.in(user._id).emit("message received");
        });
    });
});
