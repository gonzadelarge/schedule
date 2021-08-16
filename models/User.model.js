const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname:{ type: String, required: true },
        nick: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        birthDay: { type: Date },
        avatar: { type: String, default: 'https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png' },
        todo: [ { type: mongoose.Types.ObjectId, ref: 'Todo' } ],
        meeting: [ { type: mongoose.Types.ObjectId, ref: 'meetings' } ]
    },
    { timestamps: true }
);  

const User = mongoose.model('users', userSchema);

module.exports = User;