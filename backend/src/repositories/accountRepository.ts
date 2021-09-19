import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Model } from "~/@types";
import { pool } from "~/util/pool";

export const findByLoginId = async (loginId: string): Promise<Model.Account | null> => {
  const [rows] = await pool.query<
    (RowDataPacket & {
      id: number;
      userId: number;
      encryptedPassword: string;
    })[]
  >("SELECT `id`, `userId`, `encryptedPassword` FROM `accounts` WHERE `loginId` = ? LIMIT 1", [loginId]);
  if (rows.length === 0) {
    return null;
  }

  const { id, userId, encryptedPassword } = rows[0];
  return { id, userId, loginId, encryptedPassword };
};

export const existsLoginId = async (loginId: string): Promise<boolean> => {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT 1 FROM `accounts` WHERE `loginId` = ? LIMIT 1", loginId);

  return rows.length === 1;
};

export const insertAccount = async (account: Omit<Model.Account, "id">): Promise<Model.Account> => {
  const [result] = await pool.query<ResultSetHeader>("INSERT INTO `accounts` SET ?", account);

  return { id: result.insertId, ...account };
};
