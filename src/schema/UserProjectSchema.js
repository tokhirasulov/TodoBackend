const mongoose = require('mongoose')

const userProjectSchema = mongoose.Schema({
    project_id: {type: String, required: true},
    user_id: {type: String, required: true}
})

const UserProjects = mongoose.model('UserProjects', userProjectSchema)

module.exports = UserProjects