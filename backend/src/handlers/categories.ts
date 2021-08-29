import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { listCategories } from "~/services/categories/listCategories";
import { addCategory } from "~/services/categories/addCategory";
import{ serializeCategories, serializeCategory } from "~/util/serializer";

export const categoriesRouter = express.Router();

categoriesRouter.get("/categories", loginRequired(async (_, res, user) => {
  const categories = await listCategories({ user });

  res.json({ categories: serializeCategories(categories) });
}));

categoriesRouter.post("/categories", loginRequired(async (req, res, user) => {
  const { name } = req.body;
  const category = await addCategory({ user, name });

  res.status(201).json({ category: serializeCategory(category) });
}));
