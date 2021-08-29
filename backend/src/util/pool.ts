import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

export const withTransaction = async <T = void>(func: () => Promise<T>): Promise<T> => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    const res = await func();
    await conn.commit();
    return res;
  } catch (err) {
    await conn.rollback();
    throw err;
  }
}
