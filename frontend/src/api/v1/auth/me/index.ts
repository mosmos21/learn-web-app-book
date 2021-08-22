import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const getAuthMe = () => fetcher<Schema.GetAuthMe["response"]>()("/api/v1/auth/me");
