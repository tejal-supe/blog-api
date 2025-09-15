import express from "express";
import { authenticateJwt } from "../middlewares/auth.middleware.js";
import { authenticateAPIKey } from "../middlewares/apikey.middleware.js";
import { validatePostData } from "../utils/validator.js";
import {
  createBlogPost,
  deleteBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
} from "../controllers/post.controller.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";

const postRoute = express.Router();

postRoute.use(authenticateJwt, authenticateAPIKey);

postRoute.post("/posts", validatePostData,handleValidationErrors, createBlogPost);
postRoute.get("/posts", getAllBlogPost);
postRoute.get("/posts/:id", getBlogPostById);
postRoute.put("/posts/:id", updateBlogPost);
postRoute.delete("/posts/:id", deleteBlogPost);

export default postRoute;
