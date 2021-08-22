import { client, User, Task, Category } from "~/util/prismaClient";
import { Result } from "~/util/result";

type Props = {
  user: User,
  title: string,
  content?: string,
  categoryName: string,
}

export const addTask = async ({
  user,
  title,
  content,
  categoryName
}: Props): Promise<Result<Task & { category: Category }>> => {
  if (!await client.category.findFirst({ where: { userId: user.id, name: categoryName }})) {
      return { ok: false, error: "Invalid category id." }
  }

  const task = await client.task.create({
    data: {
      title,
      content,
      category: {
        connectOrCreate: {
          where: {
            userId_name: {
              userId: user.id,
              name: categoryName
            }
            },
          create: {
            userId: user.id,
            name: categoryName
          }
        }
      }
    },
    include: {
      category: true
    }
  });

  return { ok: true, data: task };
}
