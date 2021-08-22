import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { getHandler } from "~/handlers/categories/get";
import { postHandler } from "~/handlers/categories/post";

export const categoriesRouter = express.Router();

categoriesRouter.get("/categories", loginRequired(getHandler));
categoriesRouter.post("/categories", loginRequired(postHandler));
