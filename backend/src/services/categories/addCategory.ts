import { client, Category, User } from "~/util/prismaClient";

type Props = {
  user: User,
  name: string
}

export const addCategory = async ({
  user,
  name
}: Props): Promise<Category> => {
  return await client.category.create({
    data: {
      userId: user.id,
      name,
    }
  });
}
