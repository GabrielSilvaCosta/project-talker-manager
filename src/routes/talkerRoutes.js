// routes/talkerRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const talkerFile = path.join(__dirname, '../talker.json');

// Rota para obter todos os palestrantes cadastrados
router.get('/talker', (_request, response) => {
  fs.readFile(talkerFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: 'Erro ao ler o arquivo de palestrantes.' });
    }

    try {
      const talkers = JSON.parse(data);
      return response.status(200).json(talkers);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao processar os dados dos palestrantes.' });
    }
  });
});

// Rota para obter um palestrante pelo ID
router.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  fs.readFile(talkerFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: 'Erro ao ler o arquivo de palestrantes.' });
    }
    try {
      const talkers = JSON.parse(data);
      const talker = talkers.find((t) => t.id === parseInt(id, 10));
      if (!talker) {
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      return response.status(200).json(talker);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao processar os dados.' });
    }
  });
});

module.exports = router;
