import { Model } from "~/@types";
import { existsUserIdAndName, insertCategory } from "~/repositories/categoryRepository";

type Props = {
  user: Model.User,
  name: string
}

export const addCategory = async ({
  user,
  name
}: Props): Promise<Model.Category> => {
  if (await existsUserIdAndName(user.id, name)) {
    throw new Error();
  }

  return await insertCategory({ userId: user.id, name });
}
