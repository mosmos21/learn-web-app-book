import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const getTasks = (categoryId?: number) =>
  fetcher<Schema.GetTasks["response"]>()(
    categoryId
      ? `/api/v1/tasks?categoryId=${categoryId}`
      : "/api/v1/tasks"
  );

export const postTask = (body: Schema.PostTask["requestBody"]) =>
  fetcher<Schema.PostTask["response"]>()(
    "/api/v1/tasks",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
