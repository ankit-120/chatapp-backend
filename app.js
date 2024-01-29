import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import { error } from "./middlewares/error.middleware.js";
import userRoutes from "./routers/user.routes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
  path: "./.env",
});

connectDB();

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/chatapp/api/user", userRoutes);

app.use(error);
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
