import jwt from "jsonwebtoken";
import config from "../config/environment.js";

export const authenticateJwt = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decodeToken = jwt.verify(token,config.jwt_secret)
     const userDecoded = await User.findById(decodeToken.id);
     
    if (!userDecoded) {
      return res
        .status(400)
        .json({ message: "Token not found. Invalid User!" });
    }

    req.user = userDecoded;

    next();
  } catch (error) {
    console.log("Error in authenticate jwt middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
