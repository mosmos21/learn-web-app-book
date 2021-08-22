import { client, User, Task, Category } from "~/util/prismaClient";
import { Result } from "~/util/result";

type Props = {
  user: User,
  categoryId?: number;
}

export const listTasks = async ({
  user,
  categoryId
}: Props): Promise<Result<(Task & { category: Category })[]>> => {
  if (categoryId && !(await client.category.findFirst({ where: {userId: user.id, id: categoryId } }))) {
    return { ok: false, error: "Invalid category id." };
  }

  const tasks = categoryId
    ? await client.task.findMany({ where: { categoryId }, include: { category: true }})
    : await client.task.findMany({ where: { category: { userId: user.id } }, include: { category: true }});

  return { ok: true, data: tasks };
}
