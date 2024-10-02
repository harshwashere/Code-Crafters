import mongoose from "mongoose";

const contactModel = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    default: ''
  },
  message: {
    type: String,
    required: true,
  },
});

export const Contact = new mongoose.model("Contact", contactModel);
