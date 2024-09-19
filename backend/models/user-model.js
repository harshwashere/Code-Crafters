import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userModel = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: ''
  },
  // password: {
  //   type: String,
  //   default: ''
  // },
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
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};


export const User = new mongoose.model("User", userModel);
