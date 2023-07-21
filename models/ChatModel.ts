import mongoose ,{Schema} from "mongoose";

const ChatSchema :Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide chat name.']
    },
    isGroupChat: {
        type: Boolean,
        required: [true, 'Please provide type of chat.']
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    lastMessage: {
        type: mongoose.Types.ObjectId,
        ref: 'Message',
    }

},
    {
        timestamps: true
    });


module.exports = mongoose.model('Chat', ChatSchema)