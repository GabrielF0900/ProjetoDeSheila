import bancoDeDados from './bancoDeDados';

import connectDB from "../bancodedados/bancoDeDados";

// Busca usuário por email
export async function buscarUsuarioPorEmail(email: string) {
  const db = await connectDB();
  const usuario = await db.get("SELECT * FROM usuarios WHERE email = ?", email);
  return usuario;
}

// Insere novo usuário
export async function inserirUsuario(nome: string, email: string, senha: string, publicKey: string, privateKey: string) {
  const db = await connectDB();
  await db.run(
    "INSERT INTO usuarios (nome, email, senha, publicKey, privateKey) VALUES (?, ?, ?, ?, ?)",
    nome,
    email,
    senha,
    publicKey,
    privateKey
  );
}
