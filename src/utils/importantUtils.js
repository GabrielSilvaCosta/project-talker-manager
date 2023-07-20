const fs = require('fs').promises;
const path = require('path');

const FILE_NAME = '../talker.json';
const ABSOLUTE_FILE_PATH = path.resolve(__dirname, FILE_NAME);

const readData = () =>
  fs.readFile(ABSOLUTE_FILE_PATH, 'utf8')
    .then((fileContent) => JSON.parse(fileContent))
    .catch((error) => {
      console.error(`Erro na leitura do arquivo: ${error}`);
      throw error;
    });

const updateData = (id, updatedTalker) =>
  readData()
    .then((talkers) => {
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === id) return { ...talker, ...updatedTalker };
        return talker;
      });

      const updatedData = JSON.stringify(updatedTalkers, null, 2);
      return fs.writeFile(ABSOLUTE_FILE_PATH, updatedData, 'utf8');
    })
    .then(() => ({ id, ...updatedTalker }))
    .catch((error) => {
      console.error(`Erro na atualização do arquivo: ${error}`);
      throw error;
    });

module.exports = {
  readData,
  updateData,
};
