import express from "express"
import { registerUser } from "~/services/auth/registerUser";
import { serializeUser } from "~/util/serializer";

export const signUpRouter = express.Router();

signUpRouter.post("/auth/sign_up", async (req, res) => {
  const result = await registerUser(req.body);

  req.session.userId = result.id;
  res.status(201).json({ user: serializeUser(result) });
});

