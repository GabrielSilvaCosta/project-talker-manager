const { readData } = require('./importantUtils');

const findTalkerWithId = async (id) => {
  try {
    const talkers = await readData();
    const foundTalker = talkers.find((talker) => Number(id) === talker.id);

    return foundTalker;
  } catch (error) {
    console.error(`Erro ao procurar o palestrante pelo ID: ${error}`);
    throw error;
  }
};

module.exports = {
   findTalkerWithId,
};
