import { RequestHandler } from "express";
import { registerUser } from "~/services/auth/registerUser";
import { Schema } from "@app/schema";
import { serializeUser } from "~/handlers/auth/serializer";

export const postHandler: RequestHandler<
  {},
  Schema.PostAuthSignUp["response"],
  Schema.PostAuthSignUp["requestBody"]
> = async (req, res) => {
  const result = await registerUser(req.body);

  if (result.ok) {
    req.session.userId = result.data.id;
    res.status(201).json({ user: serializeUser(result.data) });
  }
}
