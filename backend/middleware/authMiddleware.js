import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Token not provided" });
  }

  // Ensure the 'Bearer ' prefix is removed correctly
  const jwtToken = token.startsWith("Bearer ")
    ? token.slice(7).trim()
    : token.trim();

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);

    // Verify user from the decoded email
    const userData = await User.findOne({ email: decoded.email }).select({
      password: 0,
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the error
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};

export default authMiddleware;
