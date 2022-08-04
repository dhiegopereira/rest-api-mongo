
const Message = require('../models/message')

const getAll = async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOne = async (req, res) => {
    try {
        const messages = await Message.find({ user: req.params.userId })
        res.json(messages)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const create = async (req, res) => {
    try {
        const message = new Message(req.body)
        await message.save()
        res.status(201).json(message)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const del = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)
        res.send('message deleted')
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body)
        res.json(message)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    del,
    update
}