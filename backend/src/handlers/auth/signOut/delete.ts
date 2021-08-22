import { LoginRequiredRequestHandler } from "~/@types";

export const deleteHandler: LoginRequiredRequestHandler = (req, res) => {
  delete req.session.userId;
  res.send();
}
