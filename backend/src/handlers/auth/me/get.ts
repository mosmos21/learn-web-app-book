import { LoginRequiredRequestHandler } from "~/@types";
import { Schema } from "@app/schema";
import { serializeUser } from "~/handlers/auth/serializer";

export const getHandler: LoginRequiredRequestHandler<
  {},
  Schema.GetAuthMe["response"]
> = (_, res, user) => {
  res.json({ user: serializeUser(user) });
}
