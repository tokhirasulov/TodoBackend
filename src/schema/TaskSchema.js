const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{type: String, required: true},
    description: { type: String, required: true },
    date: { type: String, required: true },
    deadLine:{type: String, required: false},
    status: { type: String, required: false },
    user_id: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;