import { User } from "../models/user-model.js";
import nodemailer from "nodemailer";
import Deals from "../models/deals-model.js";
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

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user
    if (!user) {
      user = new User({ email });
    }

    if (user) {
      user.verified = false;
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(404).json({ message: "Error sending OTP", error });
      }
      return res.status(200).json({ message: "OTP sent successfully!", info });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error generating OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  const { otp, email } = req.body; // Only the OTP is passed
  // console.log("otp, email", otp, email);
  try {
    const user = await User.findOne({ otp, email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark user as verified
    user.verified = true;
    // user.otp = undefined
    user.otpExpires = undefined;
    // Save the user as verified
    await user.save();

    // Step 3: Generate JWT Token
    const token = await user.generateToken();

    // Step 4: Send the token back to the client
    return res.status(200).json({
      message: "User verified successfully!",
      token: token, // Send the token in the response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error verifying OTP" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let fullName = req.user.displayName;
    let userEmail = req.user.emails[0].value;
    let userphoto = req.user.photos[0].value;

    let existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      // If the user exists, log them in and generate a token
      // return res.status(200).json({
      //   msg: "Login Successful with Google",
      //   token: await existingUser.generateToken(),
      //   userId: existingUser._id.toString(),
      // });
      res.redirect("https://code-crafters-seven.vercel.app");
    }

    const newUser = await User.create({
      name: fullName,
      email: userEmail,
      photo: userphoto,
      phone: null,
      otp: undefined,
      verified: req.user.emails[0].verified,
    });

    res.cookie({ token: await newUser.generateToken() });

    // res.status(200).send({
    //   msg: "Login Successful with Google",
    //   token: await newUser.generateToken(),
    //   userId: newUser._id.toString(),
    // });

    res.redirect("https://code-crafters-seven.vercel.app");
  } catch (error) {
    console.log(error);
  }
};

export const user = (req, res) => {
  try {
    const userData = req.user;

    return res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, city, country } = req.body;
    const ID = req.userID;
    const userDetail = await User.updateOne(
      { _id: req.userID },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          city: city,
          country: country,
        },
      }
    );

    if (!userDetail)
      return res.status(400).json({ message: "Couldn't Update Details" });

    return res.status(200).json({ userDetail, ID });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deals = async (req, res) => {
  try {
    const deal = await Deals.find();

    if (!deal || deals.length === 0)
      return res.status(404).json({ msg: "No deals found" });

    return res.status(200).json({ deal });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
