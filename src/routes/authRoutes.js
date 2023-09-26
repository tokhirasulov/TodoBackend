const {Router} = require('express');
const { isUserExist, login, authenticationToken } = require('../utils');
const { UserRegistration, UserLogin, UserRegistrationGet, UserLoginGet } = require('../services/user.service');

const authRouter = Router();

authRouter.get('/registration', authenticationToken, UserRegistrationGet );
authRouter.post('/registration',isUserExist,UserRegistration);
authRouter.post('/login',login, UserLogin);
authRouter.get('/login', authenticationToken, UserLoginGet)


module.exports = { authRouter };