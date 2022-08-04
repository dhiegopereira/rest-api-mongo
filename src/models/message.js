const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    id: Number,
    message: String,
    timestamp: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;

