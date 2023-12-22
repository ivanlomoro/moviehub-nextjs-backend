import { Request, Response } from "express";
import { prismaClient } from "../db/client";
import { convertToType } from "../helpers/utils";


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await prismaClient.movies.findMany({
            include: {
                Genre: true
            },
        });

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllMoviesByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const movies = await prismaClient.movies.findMany({
            where: {
                userId: convertToType(userId),
            },
            include: {
                Genre: true,
            },
        });

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const createMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body;
    const { userId } = req.params;

    try {
        const genreModel = await prismaClient.genre.findUnique({
            where: {
                name: genre,
            },
        });

        if (!genreModel) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        const movie = await prismaClient.movies.create({
            data: {
                title,
                poster_image,
                score,
                genre,
                Genre: {
                    connect: { id: convertToType(genreModel.id) },
                },
                User: {
                    connect: { id: convertToType(userId) },
                },
            },
        });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params
    try {
        const movie = await prismaClient.movies.findUnique({
            where: {
                id: convertToType(movieId),
            },
            include: {
                Genre: true,
            },
        });
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body
    const { movieId } = req.params

    try {
        const movie = await prismaClient.movies.update({
            where: {
                id: convertToType(movieId),
            },
            data: {
                title,
                poster_image,
                score,
                genre,
                Genre: {
                    connect: { name: genre },
                },
            },
        });
        res.status(201).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const deleteMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params

    try {
        const deletedMovie = await prismaClient.movies.delete({
            where: {
                id: convertToType(movieId),
            },
        })
        res.status(204).send("Movie deleted: " + deletedMovie.title)
    } catch (error) {
        res.status(500).json(error)

    }
}

export const deleteAllMovies = async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.movies.deleteMany({});
        res.status(204).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}