import { SchemaModel } from "@app/schema";
import React from "react";
import { getCategories, postCategory, deleteCategory } from "~/api/v1/categories";

export const useHook = () => {
  const [categories, setCategories] = React.useState<SchemaModel.Category[]>([]);

  const addCategory = React.useCallback(
    (name: string) => {
      postCategory({ name }).then(({ category }) => {
        setCategories([...categories, category]);
      });
    },
    [categories],
  );

  const removeCategory = React.useCallback(
    (idx) => {
      const category = categories[idx];
      if (category && !window.confirm(`Delete ${category.name}?`)) {
        return;
      }

      deleteCategory({ id: String(category.id) }).then((res) => {
        console.log(res);
      });
    },
    [categories],
  );

  React.useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return [{ categories }, { addCategory, removeCategory }] as const;
};
