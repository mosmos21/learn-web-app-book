import { LoginRequiredRequestHandler } from "~/@types";
import { Schema } from "@app/schema";
import { listCategories } from "~/services/categories/listCategories";
import{ serializeCategories } from "~/handlers/categories/serializer";

export const getHandler: LoginRequiredRequestHandler<
  {},
  Schema.GetCategories["response"]
> = async (_, res, user) => {
  const categories = await listCategories({ user });

  res.json({ categories: serializeCategories(categories) });
}
