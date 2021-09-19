import { SchemaModel } from "@app/schema";
import React from "react";
import { getCategories } from "~/api/v1/categories";
import { postCategory } from "~/api/v1/categories";

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

  React.useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return [{ categories }, { addCategory }] as const;
};
