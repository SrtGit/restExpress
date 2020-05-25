const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 50 },
    description: { type: String, required: false },
    alarmDateTime: { type: Date, required: true }, //Date ja Time
    repeat: { type: String, required: false }, //"weekly, monthly, yearly", "none"
    repeatInterval: { type: Number, required: false }, //Number that descripes how many periods there are between alarms
});

module.exports = TaskListSchema;