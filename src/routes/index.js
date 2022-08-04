const router = require('express').Router();

const users = require('./users');
const messages = require('./messages')

const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret';

router.get('/', (req, res) => res.send('RestAPI - MongoDB'));
router.use('/users', users);
router.use('/messages', messages);

module.exports = router;