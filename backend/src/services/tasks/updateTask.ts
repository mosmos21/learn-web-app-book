import { Model } from "~/@types";
import { existsByIdAndUserId, updateTaskById } from "~/repositories/taskRepository";
import { ServiceError } from "~/services/errors";

type Props = {
  user: Model.User;
  taskId: number;
  taskAttributes: Partial<Omit<Model.Task, "id">>;
};

export const updateTask = async ({ user, taskId, taskAttributes }: Props): Promise<void> => {
  if (!(await existsByIdAndUserId(taskId, user.id))) {
    throw new ServiceError("task not found");
  }

  await updateTaskById({ id: taskId, ...taskAttributes });
};
