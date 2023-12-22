import { Router } from "express";
import { createGenre, deleteAllGenres, deleteGenreById, getAllGenres, getGenreById, updateGenre } from "../controllers/genre.controllers";

const genreRoutes = Router();

genreRoutes.get("/", getAllGenres);
genreRoutes.get("/:genreId", getGenreById);
genreRoutes.post("/", createGenre);
genreRoutes.patch("/:genreId", updateGenre);
genreRoutes.delete("/:genreId", deleteGenreById);
genreRoutes.delete('/', deleteAllGenres);

export default genreRoutes;