const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
    {
        todo: [ { type: mongoose.Types.ObjectId, ref: 'Todo' } ],
        meeting: [ { type: mongoose.Types.ObjectId, ref: 'Meeting' } ]
    },
    { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;