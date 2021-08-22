import React from "react"
import { SchemaModel } from "@app/schema";
import { getCategories } from "~/api/v1/categories";
import { getTasks } from "~/api/v1/tasks";

export const useHook = () => {
  const [categories, setCategories] = React.useState<SchemaModel.Category[]>([]);
  const [tasks, setTasks] = React.useState<SchemaModel.Task[]>([]);

  React.useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
    getTasks().then(({ tasks }) => {
      setTasks(tasks);
    })
  }, []);
  return [
    { categories, tasks }
  ] as const;
}
