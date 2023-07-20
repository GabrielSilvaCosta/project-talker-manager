// routes/authRoutes.js
const express = require('express');
const crypto = require('crypto');

const router = express.Router();

// Função auxiliar para gerar um token aleatório
function generateRandom(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Rota para fazer login e obter um token aleatório
router.post('/login', (_request, response) => {
    const token = generateRandom(8); // 8 para ir para 32
    return response.status(200).json({ token });
  });

module.exports = router;
