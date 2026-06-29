const express = require('express');
const dotenv = require('dotenv');
const produtoRoutes = require('./routes/produtoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas
app.use('/produtos', produtoRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API Projeto Indústria funcionando!',
    versao: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
