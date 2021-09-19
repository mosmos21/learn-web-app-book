import React from "react";
import { SchemaModel } from "@app/schema";

type Props = {
  task: SchemaModel.Task;
};

export const TaskCard = ({ task }: Props) => (
  <div>
    ({task.category.name}) {task.title} {task.status}
  </div>
);
