import { Request, Response } from "express";
import { User } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export type LoginRequiredRequestHandler =
  (req: Request, res: Response, currentUser: User) => void;
