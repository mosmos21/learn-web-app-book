import { LoginRequiredRequestHandler } from "~/@types";
import { Schema } from "@app/schema";
import { addCategory } from "~/services/categories/addCategory";
import { serializeCategory } from "~/handlers/categories/serializer";

export const postHandler: LoginRequiredRequestHandler<
  {},
  Schema.PostCategories["response"],
  Schema.PostCategories["requestBody"]
> = async (req, res, user) => {
  const { name } = req.body;
  const category = await addCategory({ user, name });

  res.status(201).json({ category: serializeCategory(category) });
}
