import express from "express";
import { authRouter } from "~/handlers/auth";
import { tasksRouter } from "~/handlers/tasks";
import { categoriesRouter } from "~/handlers/categories";

export const router = express.Router();

router.use(authRouter);
router.use(tasksRouter);
router.use(categoriesRouter);
