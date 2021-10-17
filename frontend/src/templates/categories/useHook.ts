import { SchemaModel } from "@app/schema";
import React from "react";
import { getCategories, postCategory, deleteCategory } from "~/api/v1/categories";

export const useHook = () => {
  const [categories, setCategories] = React.useState<SchemaModel.CategoryWithCount[]>([]);

  const addCategory = React.useCallback(
    async (name: string) => {
      const { category } = await postCategory({ name });

      setCategories([...categories, { ...category, taskCount: 0 }]);
    },
    [categories],
  );

  const removeCategory = React.useCallback(
    async (idx) => {
      const category = categories[idx];
      if (category && !window.confirm(`Delete ${category.name}?`)) {
        return;
      }

      await deleteCategory({ id: String(category.id) });
    },
    [categories],
  );

  React.useEffect(() => {
    (async () => {
      const { categories } = await getCategories();
      setCategories(categories);
    })();
  }, []);

  return [{ categories }, { addCategory, removeCategory }] as const;
};
