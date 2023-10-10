const Task = require('../schema/TaskSchema')
const {checkSelfId} = require('../utils')

async function PosTask(req, res) {
    const today = new Date()
    const result = today.toISOString().split('T')[0]
    const time = today.getHours() + ":" + today.getMinutes() +":" + today.getSeconds()
    const t = req.body;
    const newTask = new Task()
    newTask.name = t.data.headLine;
    newTask.description = t.data.description;
    newTask.user_id = t.userId;
    newTask.date = t.data.estimation || result;
    newTask.deadLine = t.data.deadLine || time
    newTask.status = 'backlog';
    await newTask.save()

    const task = await Task.find({user_id: t.userId})
    res.status(200).send(task)
}

async function UpdateTasks(req, res) {
    const body = req.body;
    const {taskId, info} = body
    const task = await Task.findByIdAndUpdate(taskId)
    task.name = info.headLine
    task.description = info.description
    task.date = info.estimation
    task.deadLine = info.deadLine
    task.status = info.status
    task.save()
    res.send(task)
}

async function GetTaskId (req,res ){
    const taskId = req.params.id
    const task = await Task.findById(taskId)
    res.send(task)
}

async function DeleteTask(req, res){
    const body = req.body
    const {taskId} = body
    try{
        const task = await Task.findByIdAndDelete(taskId)
    }catch(error){
        console.log(error)
    }
    res.send('Task deleted')
}

async function UpdateStatus(req, res){
    const body = req.body;
    const {task_id, user_id} = body
    const task = await Task.findByIdAndUpdate(task_id)
    task.status = body.status
    await task.save()
    const tasks = await Task.find({user_id: user_id})
    res.status(200).send(tasks)
}

async function GetAllTasks(req, res){
    const body = req.user;
    const email = body.user.email
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1]
    checkSelfId(body.user._id, token)
    const tasks = await Task.find({user_id: body.user._id});
    res?.status(200).send({data: tasks,status:'OK'})



}

module.exports = {
GetAllTasks,
GetTaskId,
PosTask,
UpdateStatus,
UpdateTasks,
DeleteTask
}