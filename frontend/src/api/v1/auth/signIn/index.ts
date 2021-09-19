import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const postSignIn = (body: Schema.PostAuthSignIn["requestBody"]) =>
  fetcher<Schema.PostAuthSignIn["response"]>()("/api/v1/auth/sign_in", {
    method: "POST",
    body: JSON.stringify(body),
  });
