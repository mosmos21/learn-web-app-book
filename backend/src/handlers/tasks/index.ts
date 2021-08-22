import express from "express"
import { loginRequired } from "~/handlers/loginRequired";
import { getHandler } from "~/handlers/tasks/get";
import { postHandler } from "~/handlers/tasks/post";

export const tasksRouter = express.Router();

tasksRouter.get("/tasks", loginRequired(getHandler));
tasksRouter.post("/tasks", loginRequired(postHandler));
