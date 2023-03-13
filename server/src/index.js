import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
  "mongodb+srv://shinedsun:fOdxYl7Rh2HlcYus@firstmernapp.1o6psip.mongodb.net/firstmernapp?retryWrites=true&w=majority"
);

app.listen(3000, () => console.log("server start"));

import { userRouter } from "./routes/users.js";
