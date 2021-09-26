import { Model } from "~/@types";
import { existsByIdAndUserId, updateTaskById } from "~/repositories/taskRepository";

type Props = {
  user: Model.User;
  taskId: number;
  taskAttributes: Partial<Omit<Model.Task, "id">>;
};

export const updateTask = async ({ user, taskId, taskAttributes }: Props): Promise<void> => {
  if (!(await existsByIdAndUserId(taskId, user.id))) {
    throw new Error("task not found");
  }

  await updateTaskById({ id: taskId, ...taskAttributes });
};
