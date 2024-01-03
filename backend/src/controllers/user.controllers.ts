import { Request, Response } from "express"
import prismaClient from "../db/client";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.user.findMany({
            include: {
                movies: true,
            },
        });
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createUserOrLogin = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            throw new Error("Missing fields");
        }
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            res.status(409).json(existingUser);
        } else {
            const newUser = await prismaClient.user.create({
                data: { name, email },
            });

            res.status(201).json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing request' });
    }
};


export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: (userId)
            },
            include: {
                movies: true
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prismaClient.user.update({
            where: { id: (userId) },
            data: { name, email },
        });

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.user.delete({
            where: { id: (userId) }
        });
        res.status(204).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.user.deleteMany({});
        res.status(204).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};