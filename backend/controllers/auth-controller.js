import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Registration controller
export const register = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });
    const numberExist = await User.findOne({ phone });

    if (emailExist) {
      return res.status(400).json({ message: "User already exists" });
    } else if (usernameExist) {
      return res.status(403).json({ message: "Username is already taken" });
    } else if (numberExist) {
      return res.status(404).json({ message: "Mobile number already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        username,
        email,
        phone,
        password: hash,
      });

      return res.status(201).json({
        message: "User registered successfully",
        token: await newUser.generateToken(),
      });
    }
  } catch (error) {
    console.log("Error in register controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
let newOTP = [];
// OTP generation function
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += Math.floor(Math.random() * 10);
      }
      const transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      const mail = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "OTP to login in Aai Cha Dabba",
        text: `Your OTP to login in Aai Cha Dabba is ${OTP}`,
      });

      res.status(200).json({ msg: OTP });
      return newOTP.unshift(OTP);
    }
    if (!user) {
      const newUser = await User.create({ email: email });
      res.status(200).json({
        msg: "Login Successful",
        token: await newUser.generateToken(),
      });
      if (newUser) {
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += Math.floor(Math.random() * 10);
        }

        res.status(200).json({ msg: OTP });
        return newOTP.unshift(OTP);
      } else {
        return res.status(401).json({ msg: "User Not Created" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { otp } = req.body;

    if (otp === newOTP[0]) {
      return res.status(200).json({
        msg: "Login Successful",
        // token: await otp.generateToken()
        });
    } else {
      return res.status(401).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    //const user = await User.find();

    //passport.authenticate("google", { failureRedirect: "/" }),
    // async function (req, res) {
    let fullName = req.user.displayName;
    let userEmail = req.user.emails.value;

    // const newUser = await User.create({
    //   name: fullName,
    //   email: userEmail,
    //   phone: null,
    //   password: null,
    // });
    res.redirect("http://localhost:5173");
    // return res.status(200).json({
    //   msg: "Login Successful with Google",
    //   token: await user.generateToken(),
    //   userId: newUser._id.toString()
    // });
    // return res.send(`<h1>Welcome ${fullName}</h1>`);
    // };
  } catch (error) {
    console.log(error);
  }
};

export const user = (req, res) => {
  try {
    const userData = req.user;
    
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};
