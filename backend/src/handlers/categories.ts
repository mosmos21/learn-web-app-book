import { Schema } from "@app/schema";
import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { addCategory } from "~/services/categories/addCategory";
import { listCategories } from "~/services/categories/listCategories";
import { removeCategory } from "~/services/categories/removeCategory";
import { serializeCategories, serializeCategory } from "~/util/serializer";

export const categoriesRouter = express.Router();

categoriesRouter.get<Record<string, unknown>, Schema.GetCategories["response"]>(
  "/categories",
  loginRequired(async (_, res, user) => {
    const categories = await listCategories({ user });

    res.json({ categories: serializeCategories(categories) });
  }),
);

categoriesRouter.post<Record<string, unknown>, Schema.PostCategories["response"], Schema.PostCategories["requestBody"]>(
  "/categories",
  loginRequired(async (req, res, user) => {
    const { name } = req.body;
    const category = await addCategory({ user, name });

    res.status(201).json({ category: serializeCategory(category) });
  }),
);

categoriesRouter.delete<Schema.DeleteCategory["routeParameters"], Schema.DeleteCategory["response"]>(
  "/categories/:id",
  loginRequired(async (req, res, user) => {
    const { id } = req.params;
    const categoryId = Number(id);
    await removeCategory({ categoryId, userId: user.id });

    res.status(200).json({ id: categoryId });
  }),
);
