import { fetcher } from "~/api/fetcher";

export const deleteSignOut = () =>
  fetcher()(
    "/api/v1/auth/sign_out",
    { method: "DELETE" }
  );
