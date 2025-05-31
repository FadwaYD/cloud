const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/:email', authController.getUser);
router.put('/:email', authController.updateUser);
router.delete('/:email', authController.deleteUser);

module.exports = router;
