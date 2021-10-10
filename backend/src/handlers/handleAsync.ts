import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export const handleAsync =
  <
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>,
  >(
    handler: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
