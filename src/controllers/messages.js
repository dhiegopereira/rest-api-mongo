
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
        const messages = await Message.find({ _id: req.params._id })
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
        await Message.findByIdAndDelete(req.params._id)
        res.send('message deleted')
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const update = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params._id, req.body)
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