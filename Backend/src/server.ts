import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import apiRoutes from "../src/minhaAPI/minhaApi";// Importando as rotas da API






dotenv.config(); // Carrega as variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Rotas da API
app.use('/api', apiRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
