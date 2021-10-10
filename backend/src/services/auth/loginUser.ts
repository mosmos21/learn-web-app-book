import bcrypt from "bcrypt";
import { Model } from "~/@types";
import { findByLoginId } from "~/repositories/accountRepository";
import { findById } from "~/repositories/userRepository";
import { AuthenticationError, InternalServerError } from "~/services/errors";

type Props = {
  loginId: string;
  password: string;
};

export const loginUser = async ({ loginId, password }: Props): Promise<Model.User> => {
  const account = await findByLoginId(loginId);
  if (!account) {
    throw new AuthenticationError("Account not found.");
  }

  const equal = await bcrypt.compare(password, account.encryptedPassword);
  if (!equal) {
    throw new AuthenticationError("ID or password not correct.");
  }

  const user = await findById(account.userId);
  if (user === null) {
    throw new InternalServerError();
  }

  return user;
};
