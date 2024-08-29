import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });

    const usernameExist = await User.findOne({ username });

    const number = await User.findOne({ phone });

    if (emailExist) {
      return res.status(400).json({ message: "User already exist" });
    } else if (usernameExist) {
      return res.status(403).json({ message: "Username is already taken" });
    } else if (number) {
      return res.status(404).json({ message: "Mobile number already exist" });
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
      return res.status(201).json({ message: newUser });
    }
  } catch (error) {
    console.log("This error is from auth-controller.js        ", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        res.status(200).send({
          msg: "Login Successful",
          token: await user.generateToken(),
          userId: user._id.toString(),
        });
      } else {
        res.status(401).send({ msg: "Invalid login credentials" });
      }
    } else {
      res.status(400).send({ msg: "User doesn't exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
