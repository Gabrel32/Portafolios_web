import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { from_name, from_email, message, date, time } = req.body;

  // Validate required fields
  if (!from_name || !from_email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"${from_name}" <${process.env.SMTP_USER}>`, // Gmail often overrides this to the auth user, but setting name helps
      replyTo: from_email,
      to: "alegabo70@gmail.com", // Sending to self/owner
      subject: `Nuevo mensaje de portafolio web de ${from_name}`,
      text: `
        Nombre: ${from_name}
        Email: ${from_email}
        Fecha: ${date} ${time}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0;">
          <div style="background-color: #8B4513; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Nuevo Mensaje del Portafolio</h2>
          </div>
          <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Has recibido un nuevo mensaje de contacto:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; width: 30%; font-weight: bold; color: #555555;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${from_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">
                  <a href="mailto:${from_email}" style="color: #8B4513; text-decoration: none;">${from_email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Fecha:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${date} a las ${time}</td>
              </tr>
            </table>

            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #8B4513; border-radius: 4px;">
              <p style="font-weight: bold; margin-top: 0; color: #555555;">Mensaje:</p>
              <p style="margin-bottom: 0; color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999999;">
              <p>Este correo fue enviado desde tu formulario de contacto web.</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
}
