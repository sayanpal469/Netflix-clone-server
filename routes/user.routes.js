import express from "express";
import { createUser, fetchUserById, loginUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter
.post("/signUp", createUser)
.post("/login", loginUser)
.get("/:id", fetchUserById)

export default userRouter;
