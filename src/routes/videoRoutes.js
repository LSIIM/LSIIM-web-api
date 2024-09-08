const express = require('express');


const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
// router.post('/register', authController.register); // não estamos utilizando registro de usuários no momento

module.exports = router;
