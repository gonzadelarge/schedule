const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname:{ type: String },
        nick: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true },
        birthDay: { type: Date },
        avatar: { type: String },
    },
    { timestamps: true }
);  

const User = mongoose.model('User', userSchema);

module.exports = User;