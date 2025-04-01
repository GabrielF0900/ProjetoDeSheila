import express from "express";
import { Request, Response, NextFunction } from "express";
import { criptografarSenha, gerarParDeChaves } from "../criptografia/criptografiaE2EE";
import connectDB from "../bancodedados/bancoDeDados"; // Função de conexão com o banco de dados

const router = express.Router();

// Interface para tipar o corpo da requisição
interface Usuario {
  nome: string;
  senha: string;
  email: string;
}

// Rota para registro de usuário
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    // Tipando explicitamente o corpo da requisição
    const { nome, senha, email }: Usuario = req.body as Usuario; // Desestruturação com tipagem explícita

    console.log("Dados recebidos:", req.body); // Log dos dados recebidos

    // Verifica se todos os campos foram preenchidos
    if (!nome || !senha || !email) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
      const db = await connectDB(); // Conecta ao banco de dados

      // Carregando chave pública para criptografar a senha e enviar ao banco de dados
      const { publicKey } = gerarParDeChaves(); // Chave pública para criptografar a senha
      if (!publicKey) {
        return res.status(500).json({ message: "Chave não encontrada." });
      }

      // Criptografando a senha com a chave pública
      const senhaCriptografada = criptografarSenha(senha, publicKey); // Chave pública para criptografar a senha

      // Inserindo informações no banco de dados
      const query = `INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)`;
      await db.run(query, [nome, senhaCriptografada, email]); // Insere os dados no banco de dados

      console.log(`Usuário ${nome}, ${email} registrado com sucesso!`);
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
      console.error("Erro no registro:", error);
      return res.status(500).json({ erro: "Erro ao registrar usuário" });
    }
  }
);

export default router;
