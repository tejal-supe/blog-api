import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  database_url: process.env.MONGODB_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRES_IN,
  base_url: process.env.BASE_URL,
};

export default config;