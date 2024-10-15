import jwt from "jsonwebtoken";
import AdminUser from "../models/admin-model.js";

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const verify = jwt.verify(jwtToken, process.env.JWT_KEY);

    const adminData = await AdminUser.findOne({ email: verify.email }).select({
      password: 0,
    });

    req.admin = adminData;
    req.token = token;
    req.adminId = adminData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};

export default adminMiddleware;
