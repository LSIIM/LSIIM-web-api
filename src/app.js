const express = require('express');
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes'); // não estamos utilizando nada relacionado a usuários no momento

const app = express();

app.use(express.json());

// Definindo as rotas
app.use('/auth', authRoutes);
// app.use('/users', userRoutes); // não estamos utilizando nada relacionado a usuários no momento

module.exports = app;
