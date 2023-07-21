import mongoose, { Schema } from "mongoose";


const MessageSchema: Schema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the sender.']
    },
    reciever: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    chat: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
        required: [true, 'Please provide the chatId.']
    },
    content: {
        type: String,
        required: [true, 'Please provide message.']
    }
},
    {
        timestamps: true
    });


module.exports = mongoose.model('Message', MessageSchema);