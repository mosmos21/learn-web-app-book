import { LoginRequiredRequestHandler } from "~/@types";

export const me: LoginRequiredRequestHandler = (_, res, user) => {
  res.json(user);
}
