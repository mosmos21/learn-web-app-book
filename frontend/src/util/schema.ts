export type User = {
  name: string;
}

export type Category = {
  id: number;
  name: string;
}

export type Task = {
  id: number;
  title: string;
  content?: string;
  category: Category;
  status: TaskStatus;
}

export type TaskStatus = "NEW" | "DOING" | "COMPLETED";
