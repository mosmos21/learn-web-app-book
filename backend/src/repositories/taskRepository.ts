import { pool } from "~/util/pool";
import { Model } from "~/@types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const findById = async (id: number): Promise<Model.TaskWithCategory | null> => {
  const columns = ["c.id as categoryId", "c.name as categoryName", "title", "content", "status"];
  const [rows] = await pool.query<
    (RowDataPacket & {
      categoryId: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >("SELECT ?? FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `t`.`id` = ?", [
    columns,
    id,
  ]);
  if (rows.length === 0) {
    return null;
  }

  const { categoryId, categoryName, title, content, status } = rows[0];
  return {
    id,
    title,
    content,
    status,
    category: {
      id: categoryId,
      name: categoryName,
    },
  };
};

export const whereByCategoryId = async (categoryId: number): Promise<Model.TaskWithCategory[]> => {
  const columns = ["t.id as id", "c.name as categoryName", "title", "content", "status"];
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >("SELECT ?? FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `c`.`id` = ?", [
    columns,
    categoryId,
  ]);

  return rows.map((task) => ({
    id: task.id,
    category: {
      id: categoryId,
      name: task.categoryName,
    },
    title: task.title,
    content: task.content,
    status: task.status,
  }));
};

export const whereByUserId = async (userId: number): Promise<Model.TaskWithCategory[]> => {
  const columns = [
    "`t`.`id` as `id`",
    "`c`.`id` as `categoryId`",
    "`c`.`name` as `categoryName`",
    "`t`.`title`",
    "`t`.`content`",
    "`t`.`status`",
  ];
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      categoryId: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >("SELECT ?? FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `c`.`userId` = ?", [
    columns,
    userId,
  ]);

  return rows.map((task) => ({
    id: task.id,
    category: {
      id: task.categoryId,
      name: task.categoryName,
    },
    title: task.title,
    content: task.content,
    status: task.status,
  }));
};

export const insertTask = async (task: Omit<Model.Task, "id" | "status">): Promise<Model.Task> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO `tasks` SET ?", task);

  return { id: result.insertId, status: "NEW", ...task };
};

export const updateTaskStatusById = async (id: number, status: Model.TaskStatus): Promise<void> => {
  await pool.query("UPDATE `tasks` SET `status` = ?, `updatedAt` = ? WHERE `id` = ?", [status, Date(), id]);
};
