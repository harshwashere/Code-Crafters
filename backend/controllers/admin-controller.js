import AdminUser from "../models/admin-model.js";
import { Contact } from "../models/contact-model.js";
import Deals from "../models/deals-model.js";
import Menu from "../models/menu-model.js";
import Order from "../models/orders-model.js";
import scheduleModel from "../models/schedule-model.js";
import TiffinData from "../models/specialTiffin-model.js";
import { User } from "../models/user-model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();

const transporter = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: process.env.MAILPORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Generate random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
};

export const adminotp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ email });

    // if (!admin) {
    //   const otp = generateOTP();
    //   const salt = await bcrypt.genSalt(10);
    //   const hash = await bcrypt.hash(password, salt);
    //   const newadmin = await AdminUser.create({
    //     email,
    //     password: hash,
    //     otp,
    //     otpExpires: Date.now() + 10 * 60 * 1000,
    //   });

    //   const mailOptions = {
    //     from: process.env.MAIL_USER,
    //     to: email,
    //     subject: "Admin Login OTP Code",
    //     text: `Your admin login OTP is ${otp}`,
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return res.status(404).json({ message: "Error sending OTP", error });
    //     }
    //     return res
    //       .status(200)
    //       .json({ message: "OTP sent successfully!", info });
    //   });

    //   return res.status(200).json({
    //     msg: newadmin,
    //   });
    // } else {
      if (admin) {
        admin.verified = false;
      }

      const otp = generateOTP();
      admin.otp = otp;
      admin.otpExpires = Date.now() + 10 * 60 * 1000;
      await admin.save();

      const pass = await bcrypt.compare(password, admin.password);
      if (pass) {
        const mailOptions = {
          from: process.env.MAIL_USER,
          to: email,
          subject: "Admin Login OTP Code",
          text: `Your admin login OTP is ${otp}. Your OTP will expire after 10 minutes`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res
              .status(404)
              .json({ message: "Error sending OTP", error });
          }
          return res
            .status(200)
            .json({ message: "OTP sent successfully!", info });
        });
      }
  } catch (error) {
    console.log(error);
  }
};

export const adminotpverify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const adminuser = await AdminUser.findOne({ email });

    if (!adminuser || adminuser.otp !== otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    if (adminuser.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark user as verified
    adminuser.verified = true;
    adminuser.otp = undefined;
    adminuser.otpExpires = undefined;

    await adminuser.save();

    const token = await adminuser.generateToken();

    return res.status(200).json({
      message: "User verified successfully!!",
      token,
      userId: adminuser._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdminUser = async (req, res) => {
  try {
    const adminuser = req.admin;
    console.log(req.admin);
    return res.status(200).json({ message: adminuser });
  } catch (error) {
    console.log(error);
  }
};

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0)
      return res.status(404).json({ message: "No contacts found" });

    res.status(200).json({ message: contacts });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });

    if (!user || user.length === 0)
      return res.status(404).json({ message: "No user found" });

    return res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
  }
};

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();

    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }

    return res.status(200).json({ menu });
  } catch (error) {
    console.error(error);
  }
};

export const getSpecialTiffin = async (req, res) => {
  try {
    const specialData = await TiffinData.find();

    if (!specialData || specialData.length === 0) {
      return res.status(404).json({ message: "No special dishes found" });
    }

    return res.status(200).json({ specialData });
  } catch (error) {
    console.error(error);
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deals.find();

    if (!deals || deals.length === 0) {
      return res.status(404).json({ message: "No deals found" });
    }

    return res.status(200).json({ deals });
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();

    if (!order || order.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
  }
};

export const getAllScheduleOrders = async (req, res) => {
  try {
    const scheduleData = await scheduleModel.find();

    if (!scheduleData || scheduleData.length === 0) {
      return res.status(404).json({ message: "No scheduled data found" });
    }

    return res.status(200).json({ scheduleData });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMenuDish = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: "Dish not found" });
    }

    await Menu.findByIdAndDelete(id);
    return res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContacts = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Users not found" });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDeals = async (req, res) => {
  try {
    const { id } = req.params;

    const deals = await Deals.findById(id);

    if (!deals) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await Deals.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSpecial = async (req, res) => {
  try {
    const { id } = req.params;

    const tiffin = await TiffinData.findById(id);

    if (!tiffin) {
      return res.status(404).json({ message: "Special tiffin not found" });
    }

    await TiffinData.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Special tiffin deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteScheduleData = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await scheduleModel.findById(id);

    if (!schedule) {
      return res.status(404).json({ message: "Scheduled order not found" });
    }

    await scheduleModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Scheduled order deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};