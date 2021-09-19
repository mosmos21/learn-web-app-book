import express from "express";
import { meRouter } from "~/handlers/auth/me";
import { signInRouter } from "~/handlers/auth/signIn";
import { signOutRouter } from "~/handlers/auth/signOut";
import { signUpRouter } from "~/handlers/auth/signUp";

export const authRouter = express.Router();

authRouter.use(signUpRouter);
authRouter.use(signInRouter);
authRouter.use(signOutRouter);
authRouter.use(meRouter);
