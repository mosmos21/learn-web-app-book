import { RequestHandler } from "express";
import { LoginRequiredRequestHandler } from "~/@types";
import { client } from "~/util/prismaClient";

export const loginRequired = (handler: LoginRequiredRequestHandler): RequestHandler =>
  async (req, res, next) => {
    const id = req.session.userId;
    if (!id) {
      res.status(401).send();
      return;
    }

    const user = await client.user.findFirst({ where: { id }});
    if (!user) {
      res.status(401).send();
      return;
    }

    handler(req, res, user);
}
