import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all cabang
router.get("/", (req, res) => {
  db.query("SELECT * FROM cabang ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD cabang
router.post("/", async (req, res) => {
  const { kode_cabang, nama_cabang, alamat } = req.body;

  if (!kode_cabang || !nama_cabang || !alamat) {
    return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
  }

  try {
    await db.query(
      "INSERT INTO cabang (kode_cabang, nama_cabang, alamat) VALUES (?,?,?)",
      [kode_cabang, nama_cabang, alamat]
    );

    res.json({ success: true, message: "Data cabang berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal tambah data cabang!", error: err.message });
  }
});

// EDIT cabang
router.put("/:id", async (req, res) => {
  const { nama_cabang, alamat } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE cabang SET nama_cabang = ?, alamat = ? WHERE id = ?",
      [nama_cabang, alamat, id]
    );

    res.json({ success: true, message: "Data cabang berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal update cabang!" });
  }
});


// DELETE cabang
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM cabang WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cabang berhasil dihapus" });
  });
});

export default router;
