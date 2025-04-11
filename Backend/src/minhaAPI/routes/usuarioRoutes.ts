import express from "express";
import { registerUser } from "../controllers/register/register";
import { Login } from "../controllers/login/login";
import { forgotPassword } from "../controllers/forgotpassword/forgotPassword";
import { resetPassword } from "../controllers/resetpassword/resetPassword";
import jwt from "jsonwebtoken";
import { decodeToken } from "../utils/JWT";

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
    return res
      .status(400)
      .json({ mensagem: "Email e senha são obrigatórios." });
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

router.post("/forgot-password", async (req: any, res: any) => {
  const { email } = req.body;

  if (typeof email !== "string") {
    return res.status(400).json({ mensagem: "Email é obrigatório." });
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    await forgotPassword(email);
    res
      .status(200)
      .json({ mensagem: "Email de redefinição de senha enviado com sucesso!" });
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
});

router.post("/reset-password", async (req: any, res: any) => {
  const {token, email, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ mensagem: "Token não encontrado." });
  }

  if (typeof email !== "string" || typeof newPassword !== "string") {
    return res.status(400).json({ mensagem: "Email e nova senha são obrigatórios." });
  }

  try {
    decodeToken(token);
    await resetPassword(email, newPassword);
    res.status(200).json({ mensagem: "Senha redefinida com sucesso!" });
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ mensagem: "Token expirado, tente novamente" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ mensagem: "Token inválido, tente novamente" });
    }

    res.status(400).json({ erro: error.message });
  }
});

export default router;
