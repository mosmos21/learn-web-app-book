import { pool } from "~/util/pool";
import { Model } from "~/@types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

export const whereByUserId = async (userId: number): Promise<Model.Category[]> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      name: string;
    })[]
  >("SELECT `id`, `name` FROM `categories` WHERE `userId` = ?", [userId]);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    userId,
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
