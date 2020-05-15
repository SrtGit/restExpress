const mongoose = require('mongoose');
const TaskListSchema = require('./TaskList');
// Mongoose skeema tarjoaa MongoDb:n tiedoille tietomallin ja validoinnin sekä rajoittimia

const TaskSchema = new mongoose.Schema({

    activeTasks: { type: [TaskListSchema], required: false},

    taskHistory: {type: [TaskListSchema], required: false },

});

//Schemasta pitää tehdä model, josta kanta tehdään
const Task = mongoose.model('Task', TaskSchema);

//export model
module.exports = Task;