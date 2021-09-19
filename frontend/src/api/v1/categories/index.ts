import { fetcher } from "~/api/fetcher";
import { Schema } from "@app/schema";

export const getCategories = () => fetcher<Schema.GetCategories["response"]>()("/api/v1/categories");

export const postCategory = (body: Schema.PostCategories["requestBody"]) =>
  fetcher<Schema.PostCategories["response"]>()("/api/v1/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });
