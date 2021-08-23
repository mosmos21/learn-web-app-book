import React from "react";
import { useHook } from "~/templates/top/useHook";
import { Form } from "~/templates/top/Form";
import { TaskCard } from "~/templates/top/TaskCard";

export const Template = () => {
  const [
    { categories, tasks },
    { addTask }
  ] = useHook();

  return (
    <div>
      <Form categories={categories} onSubmit={addTask} />
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
