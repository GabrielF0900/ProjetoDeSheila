import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";
import { writeFileSync } from "fs";
import path from "path";

// 1. Geração das Chaves (como no seu código original)
export function gerarParDeChaves() {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { 
            type: "pkcs8", 
            format: "pem",
            cipher: 'aes-256-cbc', // Criptografa a chave privada no disco
            passphrase: 'sua-senha-super-secreta' // 👈 Nunca armazene isso no código!
        }
    });

    // Salva em arquivos (apenas para desenvolvimento)
    writeFileSync(path.join(__dirname, "chave_publica.pem"), publicKey);
    writeFileSync(path.join(__dirname, "chave_privada.pem"), privateKey);

    return { publicKey, privateKey };
}

// 2. Criptografa a senha com a chave pública
export function criptografarSenha(senha: string, publicKey: string): string {
    return publicEncrypt(publicKey, Buffer.from(senha))
           .toString('base64');
}

// 3. Descriptografa com a chave privada (apenas para comparação)
export function descriptografarSenha(criptografado: string, privateKey: string): string {
    return privateDecrypt(
        { 
            key: privateKey,
            passphrase: 'sua-senha-super-secreta' // Mesma usada na geração
        },
        Buffer.from(criptografado, 'base64')
    ).toString();
}