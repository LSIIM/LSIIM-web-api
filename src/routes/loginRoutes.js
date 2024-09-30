const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Use a chave secreta do arquivo .env ou uma fixa
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui'; 

const validCredentials = {
    email: 'exemplo@dominio.com',
    senha: '123456'
};

router.post('/', (req, res) => {
    const { email, senha } = req.body;

  
    if (email === validCredentials.email && senha === validCredentials.senha) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
         return res.status(200).json({
            message: 'Login bem-sucedido!',
            token 
        });
    } else {
        return res.status(401).json({ message: 'Email ou senha inválidos!' });
    }
});

module.exports = router;
