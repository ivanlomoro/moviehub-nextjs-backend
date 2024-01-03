import { Response, Request } from "express";
import prismaClient from "../db/client";

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await prismaClient.genre.findMany({
            include: {
                movies: true,
            },
        });

        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const genre = await prismaClient.genre.findUnique({
            where: {
                id: (genreId),
            },
            include: {
                movies: true,
            },
        });

        if (genre) {
            res.status(200).json(genre);
        } else {
            res.status(404).json({ message: 'Genre not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        if (!name) {
            throw new Error("Missing fields");
        }

        const newGenre = await prismaClient.genre.create({
            data: {
                name,
            },
        });

        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params;
    const { name } = req.body;

    try {
        const updatedGenre = await prismaClient.genre.update({
            where: {
                id: (genreId),
            },
            data: {
                name,
            },
            include: {
                movies: true,
            },
        });
        res.status(200).json(updatedGenre);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params;

    try {
        const deletedGenre = await prismaClient.genre.delete({
            where: {
                id: (genreId),
            },
        });
        res.status(204).send(deletedGenre);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await prismaClient.genre.deleteMany({});
        res.status(204).json(genres);
    } catch (error) {
        res.status(500).json(error);
    }
}