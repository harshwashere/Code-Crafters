import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: ''
  },
  otp: {
    type: String,
    unique: true,
  },
  otpExpires: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
});

userModel.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userid: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const User = new model("User", userModel);
