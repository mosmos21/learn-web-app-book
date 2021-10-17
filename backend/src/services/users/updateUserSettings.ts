import { Model } from "~/@types";
import { withTransaction } from "~/util/pool";
import { updateByUserId } from "~/repositories/accountRepository";
import bcrypt from "bcrypt";
import { updateById } from "~/repositories/userRepository";

type Props = {
  updateParams: Model.User & { password: string };
};

export const updateUserSettings = async ({ updateParams }: Props) => {
  const { id, name, password } = updateParams;
  const encryptedPassword = await bcrypt.hash(password, 10);

  await withTransaction(async () => {
    await updateByUserId({ userId: id, encryptedPassword });
    await updateById({ id, name });
  });
};
