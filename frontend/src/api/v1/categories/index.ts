import { Schema } from "@app/schema";
import { fetcher } from "~/api/fetcher";

export const getCategories = () => fetcher<Schema.GetCategories["response"]>()("/api/v1/categories");

export const postCategory = (body: Schema.PostCategories["requestBody"]) =>
  fetcher<Schema.PostCategories["response"]>()("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteCategory = (params: Schema.DeleteCategory["routeParameters"]) =>
  fetcher<Schema.DeleteCategory["response"]>()(`/api/v1/categories/${params.id}`, {
    method: "DELETE",
  });
