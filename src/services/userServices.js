// Outras funções relacionadas aos usuários, dessa vez relacionadas ao banco de dados
const User = require('../models/userModel');

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

