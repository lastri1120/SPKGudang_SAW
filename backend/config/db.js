import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spkgudang_saw"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Database terhubung!");
});

export default db;
