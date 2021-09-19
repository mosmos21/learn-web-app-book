import { Model } from "~/@types";
import TaskWithCategory = Model.TaskWithCategory;
import { withTransaction } from "~/util/pool";
import { insertTask, findById } from "~/repositories/taskRepository";
import { findByUserIdAndName, insertCategory } from "~/repositories/categoryRepository";

type Props = {
  user: Model.User;
  title: string;
  content: string | null;
  categoryName: string;
};

export const addTask = async ({ user, title, content, categoryName }: Props): Promise<TaskWithCategory> =>
  withTransaction(async () => {
    const category = await findOrInsertCategory(user.id, categoryName);

    const { id } = await insertTask({ categoryId: category.id, title, content });

    const task = await findById(id);
    if (!task) {
      throw new Error();
    }

    return task;
  });

const findOrInsertCategory = async (userId: number, name: string): Promise<Model.Category> => {
  const category = await findByUserIdAndName(userId, name);
  if (category) {
    return category;
  }

  return await insertCategory({ userId, name });
};
