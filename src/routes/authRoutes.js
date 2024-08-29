const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.teste);
// router.post('/register', authController.register); // não estamos utilizando registro de usuários no momento

module.exports = router;
