import express from "express";
import { UserController } from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", UserController.getUser);
export default router;
