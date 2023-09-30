const mongoose = require('mongoose')

const projectTasksSchema = mongoose.Schema({
    project_id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, required: true},
    executor_id: {type: String, required: true}
})

const ProjectTasks = mongoose.model('ProjectTasks', projectTasksSchema)

module.exports = ProjectTasks