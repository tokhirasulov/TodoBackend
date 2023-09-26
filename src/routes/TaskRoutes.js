const {Router} = require('express');
const { authenticationToken } = require('../utils');
const { UpdateTasks, GetTaskId, DeleteTask, UpdateStatus, PosTask, GetAllTasks } = require('../services/task.service');

const taskRouter = Router();

taskRouter.patch('/update', authenticationToken, UpdateTasks);
taskRouter.get('/update/:id', authenticationToken, GetTaskId);
taskRouter.post('/', authenticationToken, PosTask);
taskRouter.patch('/', authenticationToken, UpdateStatus)
taskRouter.delete('/', authenticationToken, DeleteTask)
taskRouter.get('/', authenticationToken, GetAllTasks)


module.exports = { taskRouter };