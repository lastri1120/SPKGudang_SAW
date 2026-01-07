import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ======================
   LOGIN
====================== */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT id, username, nama 
    FROM user 
    WHERE username = ? AND password = ?
    LIMIT 1
  `;

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Username atau password salah" });
    }

    res.json({
      success: true,
      user: result[0]
    });
  });
});

export default router;
