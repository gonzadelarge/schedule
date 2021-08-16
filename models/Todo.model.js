const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        name: { type: String, required: true },
        date: { type: String, required: true },
        message: { type: String, required: true },
        done: { type: Boolean, default: false },
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);  

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;