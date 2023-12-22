import { Router } from "express";
import { createMovie, deleteAllMovies, deleteMovieById, getAllMovies, getMovieById, updateMovie, getAllMoviesByUserId } from "../controllers/movie.controllers";

const movieRoutes = Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.get("/:movieId", getMovieById)
movieRoutes.get("/user/:userId", getAllMoviesByUserId);
movieRoutes.delete('/', deleteAllMovies);
movieRoutes.post('/:userId', createMovie);
movieRoutes.patch("/:movieId", updateMovie);
movieRoutes.delete("/:movieId", deleteMovieById);

export default movieRoutes;