import { deleteById, existsIdAndUserId } from "~/repositories/categoryRepository";
import { countByCategoryId } from "~/repositories/taskRepository";

type Props = {
  userId: number;
  categoryId: number;
};

export const removeCategory = async ({ userId, categoryId }: Props): Promise<number> => {
  if (!(await existsIdAndUserId(categoryId, userId))) {
    throw new Error();
  }

  const count = await countByCategoryId(categoryId);
  if (count > 0) {
    throw new Error();
  }

  await deleteById(categoryId);
  return categoryId;
};
