import { Request, Response } from "express";
import { User, Account } from "@prisma/client";
import { ParsedQs } from "qs";
import { NextFunction, ParamsDictionary } from "express-serve-static-core";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type LoginRequiredRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
  > =
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    currentUser: User & { account: Account | null },
    next: NextFunction,
  ) => void;
