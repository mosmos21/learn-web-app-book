import React from "react";
import { SchemaModel } from "@app/schema";
import { getCategories } from "~/api/v1/categories";
import { getTasks } from "~/api/v1/tasks";
import { postTask } from "~/api/v1/tasks";
import { FormData } from "~/templates/top/Form";

export const useHook = () => {
  const [categories, setCategories] = React.useState<SchemaModel.Category[]>([]);
  const [tasks, setTasks] = React.useState<SchemaModel.Task[]>([]);

  const addTask = React.useCallback(
    (formData: FormData) => {
      postTask(formData).then(({ task }) => {
        setTasks([...tasks, task]);
      });
    },
    [tasks],
  );

  React.useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
    getTasks().then(({ tasks }) => {
      setTasks(tasks);
    });
  }, []);
  return [{ categories, tasks }, { addTask }] as const;
};
