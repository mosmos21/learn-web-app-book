import bcrypt from "bcrypt";
import { Result } from "~/util/result";
import { client, User } from "~/util/prismaClient";

type Props = {
  loginId: string;
  password: string;
}

const error = { ok: false, error: "loginId or password invalid." } as const;

export const loginUser = async ({
  loginId,
  password
}: Props): Promise<Result<User>> => {
  const account = await client.account.findFirst({ where: { loginId }, include: { user: true }});
  if (!account) return error;

  const equal = await bcrypt.compare(password, account.encryptedPassword);
  if (!equal) return error;

  return { ok: true, data: account.user };
}
