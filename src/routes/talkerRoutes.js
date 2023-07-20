const express = require('express');

const fs = require('fs').promises;
const path = require('path');
const { updateData, readData } = require('../utils/importantUtils');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchetAt');
const validateRate = require('../middlewares/validateRate');
const { findTalkerWithId } = require('../utils/talker');
const validateTalkerId = require('../middlewares/validateId');

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
    return response
      .status(500)
      .json({ error: 'Erro ao ler o arquivo de palestrantes.' });
  }
});

router.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  try {
    const talkers = await readData();

    if (!q || q.trim() === '') {
      return res.status(200).json(talkers);
    }

    const searchTerm = q.toLowerCase();
    const filteredTalkers = talkers.filter((talker) =>
      talker.name.toLowerCase().includes(searchTerm));

    return res.status(200).json(filteredTalkers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar palestrantes.' });
  }
});

router.get('/talker/:id', validateTalkerId, async (request, response) => {
  const { id } = request.params;
  const foundTalker = await findTalkerWithId(id);
  try {
    const data = await fs.readFile(talkerFile, 'utf8');
    const talkers = JSON.parse(data);
    const talker = talkers.find((t) => t.id === parseInt(id, 10));
    if (!talker) {
      return response
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(200).json(foundTalker);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Erro ao processar os dados.' });
  }
});

router.put(
  '/talker/:id',
  validateToken,
  validateTalkerId,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    updateData(Number(id), { name, age, talk })
      .then((updatedTalker) => {
        res.status(200).json(updatedTalker);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  },
);

router.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (request, response) => {
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
      return response
        .status(500)
        .json({ error: 'Erro ao processar os dados dos palestrantes.' });
    }
  },
);

router.delete('/talker/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(talkerFile, 'utf8');
    const talkers = JSON.parse(data);
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers.splice(talkerIndex, 1);
    await fs.writeFile(talkerFile, JSON.stringify(talkers), 'utf8');
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a pessoa palestrante.' });
  }
});

module.exports = router;
