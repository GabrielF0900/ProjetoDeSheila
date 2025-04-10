import express from "express";
import { registerUser } from "../controllers/register/register";
import { Login } from "../controllers/login/login";

const router = express.Router();

router.post("/register", async (req: any, res: any) => {
  console.log("📥 Corpo recebido no /register:", req.body);
  try {
    await registerUser(req.body);
    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch (erro: any) {
    res.status(400).json({ erro: erro.message });
  }
});

router.post("/login", async (req: any, res: any) => {
  console.log("📥 Corpo recebido no /login:", req.body);

  const { email, senha } = req.body;

  if (typeof email !== "string" || typeof senha !== "string") {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  try {
    const usuario = await Login(email, senha);

    if (!usuario) {
      console.log("Email ou senha incorretos.");
      return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario,
});
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
});

export default router;
