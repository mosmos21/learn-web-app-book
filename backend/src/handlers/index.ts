import express from "express";
import { authRouter } from "~/handlers/auth";
import { categoriesRouter } from "~/handlers/categories";
import { tasksRouter } from "~/handlers/tasks";
import { errorHandler } from "~/handlers/errorHandler";

export const router = express.Router();

router.use(authRouter);
router.use(tasksRouter);
router.use(categoriesRouter);
router.use(errorHandler);
