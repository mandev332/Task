import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
const Userrouter = Router();

Userrouter.get("/", auth.CHECK, userController.GET)
  .put("/", auth.CHECK, userController.PUT)
  .delete("/", auth.CHECK, userController.DELETE);

export default Userrouter;
