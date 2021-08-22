import express from "express";
import { signUpRouter } from "~/handlers/auth/signUp";
import { signInRouter } from "~/handlers/auth/signIn";
import { signOutRouter } from "~/handlers/auth/signOut";
import { meRouter } from "~/handlers/auth/me";

export const authRouter = express.Router();

authRouter.use(signUpRouter);
authRouter.use(signInRouter);
authRouter.use(signOutRouter);
authRouter.use(meRouter);
