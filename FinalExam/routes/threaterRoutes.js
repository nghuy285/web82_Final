// routes/threaterRoutes.js
import express from "express";
import {
  createTheater,
  getTheaters,
  getTheaterById,
  bookSeat,
  findTheatersByMovie,
  addMovieToTheater,
  updateTheater,
  deleteTheater,
} from "../controllers/threaterController.js";

const router = express.Router();

router.post("/", createTheater);
router.get("/", getTheaters);
router.get("/:id", getTheaterById);
router.post("/bookSeat", bookSeat);
router.get("/movie/:movieId", findTheatersByMovie);
router.post("/:theaterId/movies", addMovieToTheater);
router.put("/:id", updateTheater);
router.delete("/:id", deleteTheater);
export default router;
