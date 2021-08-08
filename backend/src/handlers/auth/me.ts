import { RequestHandler } from "express";

export const me: RequestHandler = (req, res) => {
  // @ts-ignore
  console.log(req.session.userId);
  res.status(401).send();
}
