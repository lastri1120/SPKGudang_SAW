import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all kriteria
router.get("/", (req, res) => {
  db.query("SELECT * FROM kriteria ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD kriteria
router.post("/", (req, res) => {
  const { kode_kriteria, nama_kriteria, tipe, bobot, cara_penilaian } = req.body;
  db.query(
    "INSERT INTO kriteria (kode_kriteria, nama_kriteria, tipe, bobot, cara_penilaian) VALUES (?, ?, ?, ?, ?)",
    [kode_kriteria, nama_kriteria, tipe, bobot, cara_penilaian],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Kriteria berhasil ditambahkan", id: result.insertId });
    }
  );
});

// EDIT kriteria
router.put("/:id", async (req, res) => {
  const { nama_kriteria, bobot } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE kriteria SET nama_kriteria = ?, bobot = ? WHERE id = ?",
      [nama_kriteria, bobot, id]
    );

    res.json({ success: true, message: "Kriteria & bobot berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal update kriteria!" });
  }
});


// DELETE kriteria
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM kriteria WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Kriteria berhasil dihapus" });
  });
});

export default router;
