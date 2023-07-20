const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchetAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();
const talkerFile = path.join(__dirname, '../talker.json');

const saveTalkersToFile = async (talkers) => {
  await fs.writeFile(talkerFile, JSON.stringify(talkers), 'utf8');
};

router.get('/talker', async (_request, response) => {
  try {
    const data = await fs.readFile(talkerFile, 'utf8');
    const talkers = JSON.parse(data);
    return response.status(200).json(talkers);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Erro ao ler o arquivo de palestrantes.' });
  }
});

router.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const data = await fs.readFile(talkerFile, 'utf8');
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

router.post('/talker', validateToken, validateName, validateAge, validateTalk, validateWatchedAt, 
validateRate, async (request, response) => {
  const { name, age, talk } = request.body;

  try {
    const data = await fs.readFile(talkerFile, 'utf8');
    const talkers = JSON.parse(data);
    const id = talkers.length > 0 ? talkers[talkers.length - 1].id + 1 : 1;
    const newTalker = { id, name, age, talk };
    talkers.push(newTalker);
    await saveTalkersToFile(talkers);
    return response.status(201).json(newTalker);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Erro ao processar os dados dos palestrantes.' });
  }
});

module.exports = router;
