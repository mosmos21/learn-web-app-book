import express from "express";
import { loginUser } from "~/services/auth/loginUser";
import { serializeUser } from "~/util/serializer";

export const signInRouter = express.Router();

signInRouter.post("/auth/sign_in", async (req, res) => {
  const result = await loginUser(req.body);

  req.session.userId = result.id;
  res.json({ user: serializeUser(result) });
});
