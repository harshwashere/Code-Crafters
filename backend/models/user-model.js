import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};


export const User = new mongoose.model("User", userModel);
