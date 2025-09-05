import mongoose from "mongoose";
import config from "./environment.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.database_url);
    console.log("DB Connected", connection.connection.host);
  } catch (err) {
    console.log("Error connecting the DB", err);
  }
};
