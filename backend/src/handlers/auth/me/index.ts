import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { getHandler } from "~/handlers/auth/me/get";

export const meRouter = express.Router();

meRouter.get("/auth/me", loginRequired(getHandler));
