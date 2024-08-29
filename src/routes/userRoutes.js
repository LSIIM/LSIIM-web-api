//não estamos utilizando nada relacionado a usuários no momento, deixei aqui só por questão de organização

const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
