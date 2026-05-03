import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const { id } = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    req.user = await User.findById(id).select("-password");
    next();
  } catch {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin")
    return res.status(403).json({ message: "Access denied: admins only" });
  next();
};

export default protect;
