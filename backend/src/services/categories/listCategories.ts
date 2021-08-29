import { Model } from "~/@types";
import { whereByUserId } from "~/repositories/categoryRepository";

type Props = {
  user: Model.User
}

export const listCategories = async ({ user }: Props): Promise<Model.Category[]> => {
  return await whereByUserId(user.id);
}
