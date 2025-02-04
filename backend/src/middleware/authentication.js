import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticateUser = async (req, _res, next) => {
  console.log("Called");
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not defined");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("pay",payload);
    // console.log("token",token);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authenticateUser;
