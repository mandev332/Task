import { Router } from "express";
import auth from "../middlewares/auth.js";
import userController from "../controllers/userController.js";

const router = Router();

router
  .post("/data", auth.DATA, userController.POST)
  .post("/login", auth.LOGIN)
  .post("/register", auth.REGISTER, userController.POST);

export default router;
