import { User, Account } from "~/util/prismaClient";
import { SchemaModel } from "@app/schema";

export const serializeUser = (user: User & { account: Account | null }): SchemaModel.User => ({
  name: user.name || user.account?.loginId || ""
});
