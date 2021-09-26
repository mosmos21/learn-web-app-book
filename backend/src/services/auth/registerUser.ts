import bcrypt from "bcrypt";
import { Model } from "~/@types";
import { existsLoginId, insertAccount } from "~/repositories/accountRepository";
import { insertUser } from "~/repositories/userRepository";
import { withTransaction } from "~/util/pool";
import { ServiceError } from "~/services/errors";

type Props = {
  loginId: string;
  name: string;
  password: string;
};

export const registerUser = async ({ loginId, name, password }: Props): Promise<Model.User> => {
  if (await existsLoginId(loginId)) {
    throw new ServiceError("ID exists.");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  return await withTransaction(async () => {
    const user = await insertUser({ name });
    await insertAccount({ loginId, userId: user.id, encryptedPassword });

    return user;
  });
};
