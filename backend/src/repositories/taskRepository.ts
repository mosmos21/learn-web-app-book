import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Model } from "~/@types";
import { pool } from "~/util/pool";

export const findById = async (id: number): Promise<Model.TaskWithCategory | null> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      categoryId: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >(
    "SELECT `c`.`id` as `categoryId`, `c`.`name` as `categoryName`, `t`.`title`, `t`.`content`, `t`.`status` FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `t`.`id` = ?",
    [id],
  );
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
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >(
    "SELECT `t`.`id`, `c`.`name`, `t`.`title`, `t`.`content`, `t`.`status` FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `c`.`id` = ?",
    [categoryId],
  );

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
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      categoryId: number;
      categoryName: string;
      title: string;
      content: string | null;
      status: Model.TaskStatus;
    })[]
  >(
    "SELECT `t`.`id` AS id, `c`.`id` AS `categoryId`, `c`.`name` AS `categoryName`, `t`.`title`, `t`.`content`, `t`.`status` FROM `tasks` `t` JOIN `categories` `c` on `t`.`categoryId` = `c`.`id` WHERE `c`.`userId` = ?",
    [userId],
  );

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

export const countByCategoryId = async (categoryId: number): Promise<number> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      idCount: number;
    })[]
  >("SELECT COUNT(1) as idCount FROM `tasks` WHERE `tasks`.`categoryId` = ?", [categoryId]);

  return rows[0].idCount;
};

export const existsByIdAndUserId = async (id: number, userId: number): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT 1 FROM `tasks` `t` JOIN `categories` `c` ON `t`.`categoryId` = `c`.`id` WHERE `t`.`id` = ? AND `c`.`userId` = ? LIMIT 1",
    [id, userId],
  );
  return rows.length === 1;
};

export const insertTask = async (task: Omit<Model.Task, "id" | "status">): Promise<Model.Task> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO `tasks` SET ?", task);

  return { id: result.insertId, status: "NEW", ...task };
};

export const updateTaskById = async (task: Pick<Model.Task, "id"> & Partial<Omit<Model.Task, "id">>): Promise<void> => {
  const { id, ...attributes } = task;

  await pool.query<ResultSetHeader>("UPDATE `tasks` SET ? WHERE id = ?", [
    { ...attributes, updatedAt: new Date() },
    id,
  ]);
};
