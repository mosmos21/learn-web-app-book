import { Schema } from "@app/schema";
import { fetcher } from "~/api/fetcher";

export const getTasks = (categoryId?: number) =>
  fetcher<Schema.GetTasks["response"]>(categoryId ? `/api/v1/tasks?categoryId=${categoryId}` : "/api/v1/tasks");

export const postTask = (body: Schema.PostTasks["requestBody"]) =>
  fetcher<Schema.PostTasks["response"]>("/api/v1/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const patchTask = (id: number, body: Schema.PatchTask["requestBody"]) =>
  fetcher<Schema.PatchTask["response"]>(`/api/v1/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
