import { Request, Response } from "express";
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
  Locals extends Record<string, any> = Record<string, any>,
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
  res: Response<ResBody, Locals>,
  currentUser: Model.User,
  next: NextFunction,
) => void;

export namespace Model {
  type User = {
    id: number;
    name: string;
  };

  type Account = {
    id: number;
    userId: User["id"];
    loginId: string;
    encryptedPassword: string;
  };

  type Category = {
    id: number;
    userId: User["id"];
    name: string;
  };

  type TaskStatus = "NEW" | "DOING" | "COMPLETED";

  type Task = {
    id: number;
    categoryId: number;
    title: string;
    content: string | null;
    status: TaskStatus;
  };

  type TaskWithCategory = Omit<Task, "categoryId"> & {
    category: Omit<Category, "userId">;
  };
}
