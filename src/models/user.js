const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    phoneNumber: String,
    roles: ['admin', 'user']
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
