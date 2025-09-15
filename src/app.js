import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import config from "./config/environment.js";
import postRoute from "./routes/post.route.js";
import adminRoute from "./routes/admin.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();
app.use(
  cors({
    origin: config.base_url,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/v1/auth",userRouter)
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/category", categoryRoute);

export default app;