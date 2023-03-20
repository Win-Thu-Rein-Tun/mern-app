import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const database = process.env.DATABASE;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://shinedsun:fOdxYl7Rh2HlcYus@firstmernapp.1o6psip.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(port, () => console.log("server start"));
