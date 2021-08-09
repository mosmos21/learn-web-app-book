import { RequestHandler } from "express";
import { loginUser } from "~/services/auth/loginUser";

export const signIn: RequestHandler = async (req, res) => {
  const loginId = req.body.loginId as string;
  const password = req.body.password as string;

  const result = await loginUser({ loginId, password });
  if (result.ok) {
    req.session.userId = result.data.id;
    res.json({ user: { name: result.data.name }});
  } else {
    res.status(400).json(result.error);
  }
}
