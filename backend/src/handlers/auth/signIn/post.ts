import { RequestHandler } from "express";
import { loginUser } from "~/services/auth/loginUser";
import { Schema } from "@app/schema";
import { serializeUser } from "~/handlers/auth/serializer";

export const postHandler: RequestHandler<
  {},
  Schema.PostAuthSignIn["response"],
  Schema.PostAuthSignIn["requestBody"]
  > = async (req, res) => {
  const result = await loginUser(req.body);
  console.log(result)
  if (result.ok) {
    req.session.userId = result.data.id;
    res.json({ user: serializeUser(result.data) });
  }
}
