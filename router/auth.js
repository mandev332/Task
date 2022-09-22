import { Router } from "express";
import auth from "../middlewares/auth.js";
import userController from "../controllers/userController.js";
import restore from "../utils/sendMail.js";

const router = Router();

router
  .post("/data", auth.DATA, userController.POST)
  .post("/restore", restore.SEND, userController.PUT)
  .post("/login", auth.LOGIN)
  .post("/register", auth.REGISTER, userController.POST);

export default router;
