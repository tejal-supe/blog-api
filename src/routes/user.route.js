import express from "express";
import {
  validateLoginData,
  validateRegisteredUser,
} from "../utils/validator.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";
import {
  generateApiKey,
  getMeController,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authenticateJwt } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateRegisteredUser,
  handleValidationErrors,
  registerUser
);
userRouter.post("/login", validateLoginData, handleValidationErrors, loginUser);
userRouter.use(authenticateJwt);
userRouter.get("/me", getMeController);
userRouter.post("/generateApiKey", generateApiKey);

export default userRouter;
