import express from "express"
import { postHandler } from "~/handlers/auth/signUp/post";

export const signUpRouter = express.Router();

signUpRouter.post("/auth/sign_up", postHandler);
