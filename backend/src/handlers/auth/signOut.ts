import { LoginRequiredRequestHandler } from "~/@types";

export const signOut: LoginRequiredRequestHandler = (req, res) => {
  delete req.session.userId;
  res.send();
}
