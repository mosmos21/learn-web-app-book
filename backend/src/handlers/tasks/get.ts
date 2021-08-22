import { LoginRequiredRequestHandler } from "~/@types";
import { listTasks } from "~/services/tasks/listTasks";
import { Schema } from "@app/schema";
import { serializeTasks } from "~/handlers/tasks/serializer";

export const getHandler: LoginRequiredRequestHandler<
  {},
  Schema.GetTasks["response"],
  {},
  Schema.GetTasks["query"]
> = async (req, res, user) => {
  const result = await listTasks({
    user,
    categoryId: req.query.categoryId === undefined ? undefined : Number(req.query.categoryId)
  });

  if (result.ok) {
    res.json({ tasks: serializeTasks(result.data) });
  }
}

