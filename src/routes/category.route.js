import express from "express";
import { authenticateJwt } from "../middlewares/auth.middleware.js";
import { authenticateAPIKey } from "../middlewares/apikey.middleware.js";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const categoryRoute = express.Router();
categoryRoute.use(authenticateJwt, authenticateAPIKey);

categoryRoute.get("/categories", getAllCategory);
categoryRoute.post("/categories", createCategory);

export default categoryRoute;
