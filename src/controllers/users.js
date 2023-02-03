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

const getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params._id)
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const auth = async (req, res) => {
    const userDb = await User.findOne({ phone: req.body.phone })
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
    try {

        const userDb = await User.findOne({ phone: req.body.phone })
        if (userDb) {
            res.send('user already exists')
        } else {
            const newUser = new User(req.body)
            await newUser.save()
            res.send('user created')
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        req.body.updatedAt = new Date()
        const userDb = await User.findOneAndUpdate({ _id: req.params._id }, req.body)
        if (userDb) {
            res.json(userDb)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const del = async (req, res) => {
    try {
        const userDb = await User.findOneAndDelete({ _id: req.params._id })
        if (userDb) {
            res.json(userDb)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAll,
    getOne,
    auth,
    create,
    update,
    del
}