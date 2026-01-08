import mysql from "mysql2/promise";

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ Database siap digunakan!");

export default pool;
