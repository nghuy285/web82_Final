import express from "express";
import { movieControllers } from "../controllers/movieController.js";
import { valToken } from "../middleware/token.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/", valToken, movieControllers.addMovie);
router.get("/", movieControllers.getMovies);
router.get("/detail/:id", movieControllers.getMovieById);
router.get("/search", movieControllers.searchMovie);
router.get("/sorted", movieControllers.sortedByYear);
router.put(
  "/:id",
  valToken,
  upload.single("image"),
  movieControllers.updateMovie
);
router.delete("/:id", valToken, movieControllers.deleteMovie);

export default router;
