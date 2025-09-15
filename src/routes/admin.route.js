import express from "express";
import {
  approveBlogPosts,
  getAllPendingPost,
  rejectBlogPost,
} from "../controllers/admin.controller.js";
import { authenticateJwt } from "../middlewares/auth.middleware.js";
import { authenticateAPIKey } from "../middlewares/apikey.middleware.js";

const adminRoute = express.Router();
adminRoute.use(authenticateJwt, authenticateAPIKey);

adminRoute.get("/posts", getAllPendingPost);
adminRoute.put("/posts/:id/approve", approveBlogPosts);
adminRoute.put("/posts/:id/reject", rejectBlogPost);

export default adminRoute;
