import UserModel from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const userModel = new UserModel({ name, email, password });

    // incrypt the password
    userModel.password = await bcrypt.hash(password, 12);
    await userModel.save();

    // Jwt token
    const jwtToken = jwt.sign(
      {
        _id: userModel._id,
      },

      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // cookies
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup Successfully",
      success: true,
      user: {
        name: userModel.name,
        email: userModel.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(409).json({
        message: "Invalid details",
        success: false,
      });
    }

    // password validation
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      res.status(403).json({
        message: "Invalid Details",
        success: false,
      });
    }

    // Jwt token
    const jwtToken = jwt.sign(
      {
        _id: user._id,
      },

      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // cookies
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Login Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "LogOut Successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export { signup, login, logout };
