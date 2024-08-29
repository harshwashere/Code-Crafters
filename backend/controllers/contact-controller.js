import { Contact } from "../models/contact-model.js";
import nodemailer from "nodemailer";

export const contact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const transport = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await Contact.create({ name, phone, email, subject, message });

    const mail = await transport.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: subject,
      text: message + ' ' + phone + ' ' + email
    })

    return res.status(200).json({ message: "Message sent", mail });
  } catch (error) {
    console.log(
      "This error is from contact-controller.js              ",
      error
    );
  }
};
