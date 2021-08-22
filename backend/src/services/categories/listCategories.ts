import { client, Category, User } from "~/util/prismaClient";

type Props = {
  user: User
}

export const listCategories = async ({ user }: Props): Promise<Category[]> => {
  return await client.category.findMany({ where: { userId: user.id }});
}
