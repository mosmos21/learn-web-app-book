import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Model } from "~/@types";
import { pool } from "~/util/pool";

export const findByUserIdAndName = async (userId: number, name: string): Promise<Model.Category | null> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
    })[]
  >("SELECT `id` FROM `categories` WHERE `userId` = ? AND `name` = ? LIMIT 1", [userId, name]);
  if (rows.length === 0) {
    return null;
  }

  const { id } = rows[0];
  return { id, userId, name };
};

export const whereByUserId = async (userId: number): Promise<Model.CategoryWithCount[]> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      name: string;
      taskCount: number;
    })[]
  >(
    "SELECT `c`.`id`, `c`.`name`, COUNT(1) as `taskCount` FROM `categories` `c` JOIN `tasks` `t` ON `c`.`id` = `t`.`categoryId` WHERE `userId` = ? GROUP BY `c`.`id`, `c`.`name`",
    [userId],
  );

  return rows.map(({ id, name, taskCount }) => ({
    id,
    name,
    userId,
    taskCount,
  }));
};

export const existsUserIdAndName = async (userId: number, name: string): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT 1 FROM `categories` WHERE `userId` = ? AND `name` = ? LIMIT 1",
    [userId, name],
  );

  return rows.length === 1;
};

export const existsIdAndUserId = async (id: number, userId: number): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT 1 FROM `categories` WHERE `id` = ? AND `userId` = ? LIMIT 1",
    [id, userId],
  );

  return rows.length === 1;
};

export const insertCategory = async (category: Omit<Model.Category, "id">): Promise<Model.Category> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO `categories` SET ?", category);

  return { id: result.insertId, ...category };
};

export const deleteById = async (id: number): Promise<void> => {
  await pool.query<ResultSetHeader>("DELETE FROM `categories` WHERE `id` = ?", [id]);
};
