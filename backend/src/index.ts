import express, { Express } from "express";
import { Task } from "@app/schema";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Start on port 3001");
});

const tasks: Task[] = [
  { id: 1, content: "頑張る" },
  { id: 2, content: "頑張らない" }
];

app.get("/api/v1/tasks", (_, res) => {
  res.send(JSON.stringify(tasks));
});
