import React from "react"
import { Task } from "@app/schema";

export const App: React.VFC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    fetch("/api/v1/tasks")
      .then(res => res.json() as any as Task[])
      .then(tasks => setTasks(tasks))
  }, []);
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.id}: {task.content}
        </li>
      ))}
    </ul>
  );
}
