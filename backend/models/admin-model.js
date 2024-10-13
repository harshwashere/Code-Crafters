import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const adminModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: "",
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

adminModel.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userid: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
}

const AdminUser = new model("AdminUser", adminModel);

export default AdminUser