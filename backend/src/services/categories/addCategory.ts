import { Model } from "~/@types";
import { existsUserIdAndName, insertCategory } from "~/repositories/categoryRepository";
import { ServiceError } from "~/services/errors";

type Props = {
  user: Model.User;
  name: string;
};

export const addCategory = async ({ user, name }: Props): Promise<Model.Category> => {
  if (await existsUserIdAndName(user.id, name)) {
    throw new ServiceError("Category exists.");
  }

  return await insertCategory({ userId: user.id, name });
};
