import { SchemaModel } from "@app/schema";
import React from "react";

type Props = {
  task: SchemaModel.Task;
};

export const TaskCard = ({ task }: Props) => (
  <div>
    ({task.category.name}) {task.title} {task.status}
  </div>
);
