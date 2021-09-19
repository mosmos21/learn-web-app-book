import { RequestHandler } from "express";
import { LoginRequiredRequestHandler } from "~/@types";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { findById } from "~/repositories/userRepository";

export const loginRequired =
  <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>,
  >(
    handler: LoginRequiredRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
  async (req, res, next) => {
    const id = req.session.userId;
    if (!id) {
      res.status(401).send();
      return;
    }

    const user = await findById(id);
    if (!user) {
      res.status(401).send();
      return;
    }

    handler(req, res, user, next);
  };
