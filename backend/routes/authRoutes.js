import express from "express";
import db from "../config/db.js";
// Sesuaikan jika path berbeda

const router = express.Router();

// Contoh endpoint login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const user = results[0];

    // (Opsional) jika belum pakai hashing, masih compare plaintext
    if (password !== user.password) {
      return res.status(401).json({ message: "Password salah" });
    }

    return res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  });
});

// Tambah endpoint lain di sini kalau ada...

export default router;
