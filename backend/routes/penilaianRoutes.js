import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM penilaian", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { alternatif_id, kriteria_id, nilai } = req.body;
  const sql = "INSERT INTO penilaian (alternatif_id, kriteria_id, nilai) VALUES (?, ?, ?)";

  db.query(sql, [alternatif_id, kriteria_id, nilai], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data berhasil disimpan", id: result.insertId });
  });
});

export default router;
