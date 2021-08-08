import express from "express";
import { authRouter } from "~/handlers/auth";
import { tasksRouter } from "~/handlers/tasks";

export const router = express.Router();

router.use(authRouter);
router.use(tasksRouter);
