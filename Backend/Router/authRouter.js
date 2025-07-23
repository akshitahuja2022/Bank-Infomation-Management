import express from "express";
import {
  loginValidation,
  signupValidation,
} from "../Middleware/authValidation.js";
import { login, logout, signup } from "../Controllers/authControllers.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/logout", logout);

export default router;
