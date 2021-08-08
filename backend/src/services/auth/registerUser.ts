import bcrypt from "bcrypt";
import { client, User } from "~/util/prismaClient";
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
}: Props): Promise<Result<User>> => {
  const account = await client.account.findFirst({ where: { loginId } });
  if (account) return { ok: false, error: "Account exists." };

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      name,
      Account: {
        create: { loginId, encryptedPassword }
      }
    }
  });

  return { ok: true, data: user }
}
