import mysql from "mysql2/promise";
import { studentDbConfig as config } from "../config/db.config.js";

if (!config.host || !config.user || !config.password || !config.database) {
  throw new Error("Database configuration is not set");
}

export const dbConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  type: config.dialect,
};

// MySQL connection
export const startConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL");
    return connection;
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
};

// Function to get table information
export const getTableInfo = async (tableName, connection) => {
  const query = `
      SELECT COLUMN_NAME, DATA_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
    `;
  const [rows] = await connection.query(query, [dbConfig.database, tableName]);
  return rows;
};

// Function to get all table schemas
export const getAllTableSchemas = async (connection) => {
  const tablesQuery = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ?
    `;
  const [tables] = await connection.query(tablesQuery, [dbConfig.database]);

  const allTableSchemas = {};
  for (const table of tables) {
    const tableName = table.TABLE_NAME;
    const tableInfo = await getTableInfo(tableName, connection);
    allTableSchemas[tableName] = tableInfo;
  }

  return allTableSchemas;
};

export const getSessionInfo = async (sessionId, connection) => {
  const query = `
      SELECT *
      FROM Session
      WHERE id = ?
      `;
  const [rows] = await connection.query(query, [sessionId]);
  return rows;
};
