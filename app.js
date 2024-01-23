import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import { error } from "./middlewares/error.middleware.js";

dotenv.config({
  path: "./.env",
});

connectDB();

const app = express();

app.use(morgan("tiny"));

app.use(error);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
