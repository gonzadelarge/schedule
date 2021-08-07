const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        avatar: { type: String, required: true, default: 'https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png' }
    },
    { timestamps: true }
);  

const User = mongoose.model('User', userSchema);

module.exports = User;