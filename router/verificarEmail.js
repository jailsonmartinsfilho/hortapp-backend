// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:05 de 04/12/2024.

const { Router } = require('express');
const nodemailer = require("nodemailer");
const router = Router();

router.post('/verificarEmail', async (req, res) => {
    const { email } = req.body;
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000);

    console.log("Recebido pedido de verificação de email:", email);

    console.log(process.env.MAIL_USERNAME)
    console.log(process.env.MAIL_PASSWORD)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });

    const configEmail = {
        from: `HortApp <${process.env.EMAIL_USER}>` ,
        to: email,
        subject: "HortApp: Código de verificação",
        html: 
        `
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Código de Verificação</title>
            </head>

            <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; padding: 0; width: 100%; background-color: #f0f0f0;">
                <div style="text-align: center; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; width: 100%;">
                    <img src="https://cdn.discordapp.com/attachments/1234790945128579124/1313887327583473764/icon.png?ex=6751c46d&is=675072ed&hm=c461f0a0e50485873deb8f40c7af01c89f440d86dc10f1f9226d215d1f97495c&" alt="Ícone de Verificação" style="width: 100px; margin-bottom: 20px;">
                    <h2 style="color: #4CAF50;">Código de Verificação</h2>
                    <p style="font-size: 16px; color: #333333;">Seu código de verificação é:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #4CAF50; margin-top: 10px;">${codigoVerificacao}</p>
                    <p style="font-size: 14px; color: #777777; margin-top: 20px;">Se você não solicitou este código, ignore este e-mail.</p>
                </div>
            </body>
        </html>
        `,
    };

    try {
        console.log("Tentando enviar e-mail...");
        await transporter.sendMail(configEmail);
        console.log("E-mail enviado com sucesso para:", email);

        res.status(200).json({ message: "E-mail enviado com sucesso!", codigoVerificacao });
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);

        res.status(500).json({ error: "Erro ao enviar o e-mail." });
    }
});

module.exports = router;