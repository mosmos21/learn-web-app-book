import { fetcher } from "~/api/fetcher";
import { User } from "~/util/schema";

type RequestBody = {
  loginId: string,
  password: string,
}

export const postSignUp = (body: RequestBody) =>
  fetcher<User>()(
    "/api/v1/auth/sign_up",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
