import express from "express"
import { loginRequired } from "~/handlers/loginRequired";

export const signOutRouter = express.Router();

signOutRouter.delete("/auth/sign_out", loginRequired((req, res) => {
  delete req.session.userId;
  res.send();
}));
