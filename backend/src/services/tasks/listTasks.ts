import { Model } from "~/@types";
import { existsIdAndUserId } from "~/repositories/categoryRepository";
import { whereByCategoryId, whereByUserId } from "~/repositories/taskRepository";
import { ServiceError } from "~/services/errors";

type Props = {
  user: Model.User;
  categoryId?: number;
};

export const listTasks = async ({ user, categoryId }: Props): Promise<Model.TaskWithCategory[]> => {
  if (categoryId) {
    if (!(await existsIdAndUserId(categoryId, user.id))) {
      throw new ServiceError("Category not found.");
    }

    return await whereByCategoryId(categoryId);
  } else {
    return await whereByUserId(user.id);
  }
};
