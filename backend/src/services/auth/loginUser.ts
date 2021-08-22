import bcrypt from "bcrypt";
import { Result } from "~/util/result";
import { client, User, Account } from "~/util/prismaClient";

type Props = {
  loginId: string;
  password: string;
}

const error = { ok: false, error: "loginId or password invalid." } as const;

export const loginUser = async ({
  loginId,
  password
}: Props): Promise<Result<User & { account: Account | null }>> => {
  const account = await client.account.findFirst({ where: { loginId } });
  if (!account) return error;

  const equal = await bcrypt.compare(password, account.encryptedPassword);
  if (!equal) return error;

  const user = await client.user.findFirst({
    where: { id: account.userId },
    include: { account: true }
  });
  if (!user) return error;

  return { ok: true, data: user };
}
