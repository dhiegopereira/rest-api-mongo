const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getToken } = require('../utils/auth')

const getAll = async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const auth = async (req, res) => {
    const user = req.body
    console.log(user)
    const userDb = await User.findOne({ username: user.username })
    if (userDb) {
        const payload = {
            id: userDb._id,
            username: userDb.username,
            roles: userDb.roles
        }
        const token = getToken(payload)
        res.json({
            success: true,
            token
        })
    } else {
        res.send({
            success: false,
            message: 'Wrong credentials'
        })
    }
}

const create = async (req, res) => {
    const user = req.body
    const userDb = await User.findOne({ username: user.username })
    if (userDb) {
        res.send('user already exists')
    } else {
        const newUser = new User(user)
        await newUser.save()
        res.send('user created')
    }
}

module.exports = {
    getAll,
    auth,
    create
}