import { Contact } from "../models/contact-model.js";
import nodemailer from "nodemailer";

export const contact = async (req, res) => {
  try {
    const { option, name, email, phone, message } = req.body;

    const transport = await nodemailer.createTransport({
      host: process.env.MAILHOST,
      port: process.env.MAILPORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await Contact.create({ option, name, email, phone, message });

    const mail = await transport.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: option,
      text: message + ' ' + phone + ' ' + email
    })

    return res.status(200).json({ message: "Message sent", mail });
  } catch (error) {
    return res.status(500).json({
      "This error is from contact-controller.js              ":
      error
    });
  }
};
