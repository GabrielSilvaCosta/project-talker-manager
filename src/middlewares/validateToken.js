module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const validTokenLength = 16;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    if (typeof authorization !== 'string' || authorization.length !== validTokenLength) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  };  