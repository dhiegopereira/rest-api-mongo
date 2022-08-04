const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.post('/auth/', userController.auth);
router.post('/', userController.create);

module.exports = router;

