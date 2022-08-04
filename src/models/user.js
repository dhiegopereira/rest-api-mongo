const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: String,
    phone: String,
    roles: ['admin', 'user'],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
