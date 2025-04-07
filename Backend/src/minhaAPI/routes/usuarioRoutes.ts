import express from "express";
import { registerUser } from "../controllers/register/register";

const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("📥 Corpo recebido no /register:", req.body);
    try {
      await registerUser(req.body);
      res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
    } catch (erro: any) {
      res.status(400).json({ erro: erro.message });
    }
  });
  

export default router;
