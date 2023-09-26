const { Router } = require('express');
const {AuthRouter, authRouter} = require("./authRoutes")
const {taskRouter} = require("./TaskRoutes");

const router = Router()

router.use('/auth',authRouter);
router.use('/tasks',taskRouter)

module.exports = {router}