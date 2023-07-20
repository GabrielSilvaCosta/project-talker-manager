const { findTalkerWithId } = require('../utils/talker');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundTalkerid = await findTalkerWithId(id);

    if (!foundTalkerid) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    next();
  } catch (error) {
    console.error(`Erro ao buscar pessoa palestrante por ID: ${error}`);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
