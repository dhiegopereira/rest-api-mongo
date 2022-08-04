const express = require('express');
const router = express.Router();
const { authentication } = require('../utils/auth');
const userController = require('../controllers/users');

router.get('/', authentication, userController.getAll);
router.get('/:_id', authentication, userController.getOne);
router.post('/auth/', userController.auth);
router.post('/', userController.create);
router.put('/:_id', authentication, userController.update);
router.delete('/:_id', authentication, userController.del);

module.exports = router;

