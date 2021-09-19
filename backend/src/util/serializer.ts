import { SchemaModel } from "@app/schema";
import { Model } from "~/@types";

export const serializeUser = (user: Model.User): SchemaModel.User => ({
  name: user.name,
});

export const serializeCategories = (categories: Model.Category[]): SchemaModel.Category[] =>
  categories.map(serializeCategory);

export const serializeCategory = (category: Model.Category): SchemaModel.Category => ({
  id: category.id,
  name: category.name,
});

export const serializeTasks = (tasks: Model.TaskWithCategory[]): SchemaModel.Task[] => tasks.map(serializeTask);

export const serializeTask = (task: Model.TaskWithCategory): SchemaModel.Task => ({
  id: task.id,
  title: task.title,
  content: task.content,
  status: task.status,
  category: {
    id: task.category.id,
    name: task.category.name,
  },
});
