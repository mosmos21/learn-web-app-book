import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { signUp } from "~/handlers/auth/signUp";
import { signIn } from "~/handlers/auth/signIn";
import { signOut } from "~/handlers/auth/signOut";
import { me } from "~/handlers/auth/me";

export const authRouter = express.Router();

authRouter.post("/auth/sign_up", signUp);
authRouter.post("/auth/sign_in", signIn);
authRouter.delete("/auth/sign_out", loginRequired(signOut));
authRouter.get("/auth/me", loginRequired(me));