import { Task, Category } from "~/util/prismaClient";
import { SchemaModel } from "@app/schema";

export const serializeTasks = (tasks: (Task & { category: Category })[]): SchemaModel.Task[] => tasks.map(serializeTask)

export const serializeTask = (task: Task & { category: Category }): SchemaModel.Task => ({
  id: task.id,
  title: task.title,
  content: task.content,
  status: task.status,
  category: {
    id: task.category.id,
    name: task.category.name
  }
});
