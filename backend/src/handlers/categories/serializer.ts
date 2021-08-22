import { Category } from "~/util/prismaClient";
import { SchemaModel } from "@app/schema";

export const serializeCategories = (categories: Category[]): SchemaModel.Category[] => categories.map(serializeCategory);

export const serializeCategory = (category: Category): SchemaModel.Category => ({
  id: category.id,
  name: category.name
});
