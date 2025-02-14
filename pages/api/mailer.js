const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "alegabo70@gmail.com",
    pass: "qjfuhcojoelkhmsw",
  },
});

transporter.verify()
  .then(() => {
    console.log('Transporte SMTP configurado correctamente');
  })
  .catch((error) => {
    console.error('Error al configurar el transporte SMTP:', error);
  });