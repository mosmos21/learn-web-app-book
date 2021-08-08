import { fetcher } from "~/api/fetcher";
import { User } from "@app/schema";

export const getAuthMe = () => fetcher<User>()("/api/v1/auth/me");
