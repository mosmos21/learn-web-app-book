import { RequestHandler } from "express";
import { registerUser } from "~/services/auth/registerUser";

export const signUp: RequestHandler = async (req, res) => {
  const loginId = req.body.loginId as string;
  const name = req.body.name as string;
  const password = req.body.password as string;

  const result = await registerUser({ loginId, name, password });
  if (result.ok) {
    req.session.userId = result.data.id;
    res.status(201).json(result.data);
  } else {
    res.status(401).json({ error: result.error });
  }
}
