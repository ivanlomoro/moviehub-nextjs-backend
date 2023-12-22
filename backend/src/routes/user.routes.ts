import { Router, Request, Response } from "express";
import { createUserOrLogin, deleteAllUsers, deleteUser, getAllUsers, getUserById, updateUser, } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.patch("/:userId", updateUser);
userRoutes.delete("/:userId", deleteUser);
userRoutes.delete('/', deleteAllUsers);
userRoutes.post("/", createUserOrLogin);

export default userRoutes;