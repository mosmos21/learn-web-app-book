import express from "express";
import { postHandler } from "~/handlers/auth/signIn/post";

export const signInRouter = express.Router();

signInRouter.post("/auth/sign_in", postHandler);
