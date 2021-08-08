import { fetcher } from "~/api/fetcher";
import { User } from "@app/schema";

type RequestBody = {
  loginId: string,
  password: string,
}

export const postSignIn = (body: RequestBody) =>
  fetcher<User>()(
    "/api/v1/auth/sign_in",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
