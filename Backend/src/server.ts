import express from 'express';

const app = express();
const PORT = 3000;

// Rota de teste
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando!');
});

// Conexão simples com SQLite
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./banco.db', (err) => {
  if (err) {
    console.error('❌ Erro no banco de dados:', err);
  } else {
    console.log('📊 Conectado ao banco SQLite');
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});