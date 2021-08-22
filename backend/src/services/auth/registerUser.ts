import bcrypt from "bcrypt";
import { client, User, Account } from "~/util/prismaClient";
import { Result } from "~/util/result";

type Props = {
  loginId: string;
  name: string;
  password: string;
}

export const registerUser = async ({
  loginId,
  name,
  password
}: Props): Promise<Result<User & { account: Account | null }>> => {
  const account = await client.account.findFirst({ where: { loginId } });
  if (account) return { ok: false, error: "Account exists." };

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      name,
      account: {
        create: { loginId, encryptedPassword }
      }
    },
    include: {
      account: true
    }
  });

  return { ok: true, data: user }
}
