import { deleteById, existsIdAndUserId } from "~/repositories/categoryRepository";
import { countByCategoryId } from "~/repositories/taskRepository";
import { ServiceError } from "~/services/errors";

type Props = {
  userId: number;
  categoryId: number;
};

export const removeCategory = async ({ userId, categoryId }: Props): Promise<number> => {
  if (!(await existsIdAndUserId(categoryId, userId))) {
    throw new ServiceError("Category not found.");
  }

  const count = await countByCategoryId(categoryId);
  if (count > 0) {
    throw new ServiceError("The category to which the task is linked cannot be deleted.");
  }

  await deleteById(categoryId);
  return categoryId;
};
