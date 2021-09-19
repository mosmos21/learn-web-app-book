import { Model } from "~/@types";
import TaskWithCategory = Model.TaskWithCategory;
import { existsIdAndUserId } from "~/repositories/categoryRepository";
import { whereByCategoryId, whereByUserId } from "~/repositories/taskRepository";

type Props = {
  user: Model.User;
  categoryId?: number;
};

export const listTasks = async ({ user, categoryId }: Props): Promise<TaskWithCategory[]> => {
  if (categoryId) {
    if (!(await existsIdAndUserId(categoryId, user.id))) {
      throw new Error();
    }

    return await whereByCategoryId(categoryId);
  } else {
    return await whereByUserId(user.id);
  }
};
