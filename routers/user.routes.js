import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/signup")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

export default router;
