import { Schema } from "@app/schema";
import { fetcher } from "~/api/fetcher";

export const getAuthMe = () => fetcher<Schema.GetAuthMe["response"]>("/api/v1/auth/me");
