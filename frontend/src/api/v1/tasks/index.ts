import { fetcher } from "~/api/fetcher";
import { Task } from "~/util/schema";

type Response = {
  tasks: Task[]
}

export const getTasks = (categoryId: string) =>
  fetcher<Response>()(`/api/v1/tasks?categoryId=${categoryId}`);

type RequestBody = {
  title: string;
  content?: string;
  categoryName: string;
}

export const postTask = (body: RequestBody) =>
  fetcher<Task>()(
    "/api/v1/tasks",
    {
      method: "POST",
      body: JSON.stringify(body)
    }
  );
