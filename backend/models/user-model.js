import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
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
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: ''
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
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        photo: this.photo,
        city: this.city,
        country: this.country,
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
