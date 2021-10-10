import { SchemaModel } from "@app/schema";
import React from "react";
import { getCategories } from "~/api/v1/categories";
import { getTasks, postTask, patchTask } from "~/api/v1/tasks";
import { FormData } from "~/templates/top/Form";

type Props = {
  categoryId?: number;
};

export const useHook = ({ categoryId }: Props) => {
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

  const handleClickTaskChip = React.useCallback(
    async (id: number, status: SchemaModel.TaskStatus) => {
      await patchTask(id, { task: { status } });
      await fetchTasks(categoryId);
    },
    [tasks, categoryId],
  );

  const fetchCategories = React.useCallback(async () => {
    const { categories } = await getCategories();
    setCategories(categories);
  }, [getCategories]);

  const fetchTasks = React.useCallback(
    async (categoryId) => {
      const { tasks } = await getTasks(categoryId);
      setTasks(tasks);
    },
    [getTasks],
  );

  React.useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      await fetchTasks(categoryId);
    })();
  }, [categoryId]);

  return [
    { categories, tasks },
    { addTask, handleClickTaskChip },
  ] as const;
};
