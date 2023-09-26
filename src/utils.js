const User = require("../src/schema/UserSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function authenticationToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1];
    req.token = token
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(203)
            }
        req.user = user
        next()
    })
}

const isUserExist = async(req, res, next) => {
    const users = await User.find()
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === req.body.email){
            return res.status(208).send('User already exists')
        }
    }
    next()
}

const login = async (req, res, next) => {
    const users = await User.find();
    let userExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
            const user = users[i]
            if (!await bcrypt.compare(req.body.password, users[i].password)) {
                return res.status(206).send('Passwords not matched');
            } else {
                req.user = user;
                next();
            }
            userExists = true;
            break;
        }
    }

    if (!userExists) {
        console.log(req.body.email + ' does not exist');
        return res.status(208).send('User does not exist');
    }
    next();
};

function checkSelfId(userId, token) {
    const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (userId !== validToken.user._id) {
        throw new Error('You do not have access to this page and Andrew Tate');
    }
}

module.exports =  { isUserExist, login, authenticationToken, checkSelfId};

