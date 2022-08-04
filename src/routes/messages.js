const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');

const { authentication } = require('../utils/auth');

router.get('/', authentication, messagesController.getAll);
router.get('/:id', authentication, messagesController.getOne);
router.post('/', authentication, messagesController.create);
router.delete('/:id', authentication, messagesController.del);
router.put('/:id', authentication, messagesController.update);

module.exports = router;
