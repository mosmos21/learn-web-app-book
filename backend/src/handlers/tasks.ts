import express from "express"
import { loginRequired } from "~/handlers/loginRequired";
import { listTasks } from "~/services/tasks/listTasks";
import { addTask } from "~/services/tasks/addTask";
import { serializeTasks, serializeTask } from "~/util/serializer";

export const tasksRouter = express.Router();

tasksRouter.get("/tasks", loginRequired(async (req, res, user) => {
  const tasks = await listTasks({
    user,
    categoryId: req.query.categoryId === undefined ? undefined : Number(req.query.categoryId)
  });

  res.json({ tasks: serializeTasks(tasks) });
}));

tasksRouter.post("/tasks", loginRequired(async (req, res, user) => {
  const task = await addTask({ user, ...req.body });

  res.json({ task: serializeTask(task) });
}));
