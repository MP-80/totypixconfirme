const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
    const { from, body } = req.body;
    const message = `Mensagem de: ${from}\nConteúdo: ${body}`;

    // Aqui, chamaremos a função para enviar o e-mail
    sendEmail(message);

    res.status(200).send('Mensagem recebida e email enviado.');
});

function sendEmail(message) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha'
        }
    });

    let mailOptions = {
        from: 'seuemail@gmail.com',
        to: 'destinatario@gmail.com',
        subject: 'Nova Mensagem SMS Recebida',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email enviado: ' + info.response);
    });
}

app.listen(3044, () => {
    console.log('Servidor rodando na porta 3044');
});
