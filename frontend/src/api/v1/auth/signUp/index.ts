import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const postSignUp = (body: Schema.PostAuthSignUp["requestBody"]) =>
  fetcher<Schema.PostAuthSignUp["response"]>()("/api/v1/auth/sign_up", {
    method: "POST",
    body: JSON.stringify(body),
  });
