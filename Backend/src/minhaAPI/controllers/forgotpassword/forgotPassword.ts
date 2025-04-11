import connectDB from "../../bancodedados/bancoDeDados";
import { generateToken } from "../../utils/JWT";
import { sendEmail } from "../../services/emailService";

// Função para enviar redefinição de senha pelo email
export async function forgotPassword(email: string): Promise<void> {
  const db = await connectDB();

  const user = await db.get("SELECT * FROM usuarios WHERE email = ?", email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const token = generateToken({ email }, "15m");

  await sendEmail(
    "israelsoaporto@gmail.com",
    email,
    "Redefinição de Senha",
    `Seu token de redefinição de senha é: ${token}`
  );
}
