import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Model } from "~/@types";
import { pool } from "~/util/pool";

export const findById = async (id: number): Promise<Model.User | null> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      name: string;
    })[]
  >("SELECT `name` FROM `users` WHERE `id` = ? LIMIT 1", [id]);
  if (rows.length === 0) {
    return null;
  }

  const { name } = rows[0];
  return { id, name };
};

export const insertUser = async (user: Omit<Model.User, "id">): Promise<Model.User> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO `users` SET ?", user);

  return { id: result.insertId, ...user };
};
