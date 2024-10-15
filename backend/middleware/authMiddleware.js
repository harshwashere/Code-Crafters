import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);
  
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  // console.log(jwtToken)
  console.log(process.env.JWT_KEY)
  try {
    const email = jwt.verify(jwtToken, process.env.JWT_KEY);
    console.log()
    const userData = await User.findOne({ email }).select({
      password: 0,
    });

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};

export default authMiddleware
