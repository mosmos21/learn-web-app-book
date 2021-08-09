import { fetcher } from "~/api/fetcher";
import { User } from "~/util/schema";

export const getAuthMe = () => fetcher<User>()("/api/v1/auth/me");
