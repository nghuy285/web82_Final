import express from "express";
import { UserController } from "../controllers/userController.js";
import { valToken } from "../middleware/token.js";
const router = express.Router();

router.get("/:id", UserController.getUser);
router.get("/", UserController.getAllUser);
router.put("/:id", UserController.updateUser);
router.post("/favorite/:movieId", valToken, UserController.addFav);
router.get("/favorite/:movieId", valToken, UserController.listFav);
router.delete("/favorite/:movieId", valToken, UserController.delFav);
router.get("/favorite", valToken, UserController.listFav);
export default router;
