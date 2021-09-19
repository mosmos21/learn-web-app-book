import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { serializeUser } from "~/util/serializer";

export const meRouter = express.Router();

meRouter.get(
  "/auth/me",
  loginRequired((_, res, user) => {
    res.json({ user: serializeUser(user) });
  }),
);
