import { gerarParDeChaves } from "../../criptografia/criptografiaE2EE";
import connectDB from "../../bancodedados/bancoDeDados";
import bcrypt from "bcrypt";

interface Usuario {
  nome: string;
  senha: string;
  email: string;
}

export async function registerUser(usuario: Usuario) {
  try {
    const db = await connectDB();
    console.log("📦 Dados recebidos na função registerUser:", usuario);

    const { nome, senha, email } = usuario;

    if (!nome || !senha || !email) {
      throw new Error("Nome, senha e email são obrigatórios.");
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await db.get("SELECT * FROM usuarios WHERE email = ?", email);
    if (usuarioExistente) {
      throw new Error("Usuário já existe.");
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido.");
    }

    // Geração das chaves e criptografia da senha
    const { publicKey, privateKey } = gerarParDeChaves();
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // A chave privada já está criptografada com uma passphrase, não precisa criptografar de novo
    const chavePrivadaCriptografada = privateKey;

    // Inserir no banco
    await db.run(
      "INSERT INTO usuarios (nome, email, senha, publicKey, privateKey) VALUES (?, ?, ?, ?, ?)",
      nome,
      email,
      senhaCriptografada,
      publicKey,
      chavePrivadaCriptografada
    );

    console.log("✅ Usuário registrado com sucesso!");

  } catch (error: any) {
    console.error("❌ Erro no registro:", error.message);
    throw error; // Será tratado pela rota
  }
}
