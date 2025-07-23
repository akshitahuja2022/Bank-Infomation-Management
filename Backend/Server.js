import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Router/authRouter.js";
import bankRouter from "./Router/bankRouter.js";
import BankModel from "./Models/BankSchema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://bankinfomanage.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
); // ready to take the req from anywhere

app.use("/auth", router);
app.use("/bank", bankRouter);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.get("/getAccounts", async (req, res) => {
  const accounts = await BankModel.find();
  res.json(accounts);
});

// connect with monggose db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.listen(4000, (req, res) => {
  console.log("Server is runnning on 4000 port ");
});
