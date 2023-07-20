// index.js
const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// adicionado a rota
app.use(talkerRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log('Online');
});
