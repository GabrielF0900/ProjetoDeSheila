import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Caminho para o banco de dados
const dbPath = path.resolve(
  "C:/Users/gabri/OneDrive/Desktop/Projetos/ProjetoDeSheila/BancodeDados",
  "database.sqlite"
);

// Função para conectar ao banco
async function connectDB() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Conectado ao banco de dados SQLite!");
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    process.exit(1);
  }
}

// Testar conexão
connectDB();

export default connectDB;
