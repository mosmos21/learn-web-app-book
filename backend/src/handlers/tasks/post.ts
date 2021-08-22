import { LoginRequiredRequestHandler } from "~/@types";
import { addTask } from "~/services/tasks/addTask";
import { serializeTask } from "~/handlers/tasks/serializer";
import { Schema } from "@app/schema";

export const postHandler: LoginRequiredRequestHandler<
  {},
  Schema.PostTask["response"],
  Schema.PostTask["requestBody"]
> = async (req, res, user) => {
  const result = await addTask({ user, ...req.body });

  if (result.ok) {
    res.json({ task: serializeTask(result.data) });
  }
}

