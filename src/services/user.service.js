const User = require("../schema/UserSchema");
const bcrypt = require('bcrypt')
const Task = require('../schema/TaskSchema')
const jwt = require('jsonwebtoken')

async function UserRegistration(req,res) {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const existuser = {email: req.body.email, password: hashedPassword, fullName: req.body.fullName}

        const user = new User(existuser);
        user.save()
        .then(() => {
            console.log('User created and saved successfully');
        })
        .catch((error) => {
            console.error('Error creating user:', error);
        });

        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15d'})
        res.json({accessToken: accessToken,userData: user})

    } catch(e){
        console.log(e)
        res.status(500).send('Something Wrong')
    }
}

async function UserRegistrationGet(req, res) {
    res.send(200)
}

async function UserLogin(req, res){
    const accessToken = jwt.sign({user: req.user}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15d'});
    const user = req.user;
    res.json({accessToken: accessToken, userData: user})
}

async function UserLoginGet(req, res) {
    res.send(200)
}



module.exports = {
    UserRegistration,
    UserRegistrationGet,
    UserLogin,
    UserLoginGet
}