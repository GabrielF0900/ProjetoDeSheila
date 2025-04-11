import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./minhaAPI/routes/usuarioRoutes";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = 9999;

// 👇 Middleware que interpreta JSON (muito importante que venha ANTES das rotas)
app.use(express.json());

// 👇 Usa as rotas de usuário
app.use("/", usuarioRoutes);

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando!");
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
