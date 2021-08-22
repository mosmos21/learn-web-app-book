import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const getTasks = (categoryId: string) =>
  fetcher<Schema.GetTasks["response"]>()(`/api/v1/tasks?categoryId=${categoryId}`);

export const postTask = (body: Schema.PostTask["requestBody"]) =>
  fetcher<Schema.PostTask["response"]>()(
    "/api/v1/tasks",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
