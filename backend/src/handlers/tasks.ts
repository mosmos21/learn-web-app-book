import { Schema } from "@app/schema";
import express from "express";
import { loginRequired } from "~/handlers/loginRequired";
import { addTask } from "~/services/tasks/addTask";
import { listTasks } from "~/services/tasks/listTasks";
import { serializeTasks, serializeTask } from "~/util/serializer";
import { updateTask } from "~/services/tasks/updateTask";

export const tasksRouter = express.Router();

tasksRouter.get<Record<string, unknown>, Schema.GetTasks["response"], void, Schema.GetTasks["query"]>(
  "/tasks",
  loginRequired(async (req, res, user) => {
    const tasks = await listTasks({
      user,
      categoryId: req.query.categoryId === undefined ? undefined : Number(req.query.categoryId),
    });

    res.json({ tasks: serializeTasks(tasks) });
  }),
);

tasksRouter.post<Record<string, unknown>, Schema.PostTasks["response"], Schema.PostTasks["requestBody"]>(
  "/tasks",
  loginRequired(async (req, res, user) => {
    const task = await addTask({ user, ...req.body });

    res.json({ task: serializeTask(task) });
  }),
);

tasksRouter.patch<{ id: string }, Schema.PatchTask["response"], Schema.PatchTask["requestBody"]>(
  "/tasks/:id",
  loginRequired(async (req, res, user) => {
    const { id } = req.params;
    await updateTask({ user, taskId: Number(id), taskAttributes: req.body.task });

    res.status(201).send({});
  }),
);
