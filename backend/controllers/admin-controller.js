import { Contact } from "../models/contact-model.js";
import { User } from "../models/user-model.js";

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
