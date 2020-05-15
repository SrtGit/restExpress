const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 50 },
    description: { type: String, required: false },
    alarmDateTime: { type: Date, required: true }, //Date ja Time
    repeats: { type: String, required: false }, //Onko kyseessä toistuva tehtävä
});

module.exports = TaskListSchema;