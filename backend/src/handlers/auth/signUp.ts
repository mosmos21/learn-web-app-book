import express from "express";
import { registerUser } from "~/services/auth/registerUser";
import { serializeUser } from "~/util/serializer";
import { Schema } from "@app/schema";

export const signUpRouter = express.Router();

signUpRouter.post<Record<string, unknown>, Schema.PostAuthSignUp["response"], Schema.PostAuthSignUp["requestBody"]>(
  "/auth/sign_up",
  async (req, res) => {
    const result = await registerUser(req.body);

    req.session.userId = result.id;
    res.status(201).json({ user: serializeUser(result) });
  },
);
