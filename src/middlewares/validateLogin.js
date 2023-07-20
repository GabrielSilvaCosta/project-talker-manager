// middlewares/validateLogin.js
function validateFields(request, response, next) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
      return response.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
  
    if (password.length < 6) {
      return response.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next(); // Se todos os campos estão válidos, chama o próximo middleware ou a rota de login
  }
  module.exports = validateFields;
