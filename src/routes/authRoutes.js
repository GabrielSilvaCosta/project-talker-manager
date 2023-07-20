// routes/authRoutes.js
const express = require('express');
const crypto = require('crypto');
const validateFields = require('../middlewares/validateLogin');

const router = express.Router();

// Função auxiliar para gerar um token aleatório
function generateRandomToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Rota para fazer login e obter um token aleatório
router.post('/login', validateFields, (_request, response) => {
    const token = generateRandomToken(8);
    return response.status(200).json({ token });
  });

module.exports = router;
