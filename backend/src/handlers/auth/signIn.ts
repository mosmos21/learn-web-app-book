import { Schema } from "@app/schema";
import express from "express";
import { loginUser } from "~/services/auth/loginUser";
import { serializeUser } from "~/util/serializer";
import { handleAsync } from "~/handlers/handleAsync";

export const signInRouter = express.Router();

signInRouter.post<Record<string, unknown>, Schema.PostAuthSignIn["response"], Schema.PostAuthSignIn["requestBody"]>(
  "/auth/sign_in",
  handleAsync(async (req, res) => {
    const result = await loginUser(req.body);

    req.session.userId = result.id;
    res.json({ user: serializeUser(result) });
  }),
);
