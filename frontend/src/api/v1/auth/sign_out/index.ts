import { fetcher } from "~/api/fetcher";
import { User } from "@app/schema";

export const deleteSignOut = () =>
  fetcher<User>()(
    "/api/v1/auth/sign_out",
    { method: "DELETE" }
  );
