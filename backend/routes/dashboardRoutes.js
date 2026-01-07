const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const result = {};

  db.query("SELECT COUNT(*) total FROM kriteria", (e1, r1) => {
    result.total_kriteria = r1[0].total;

    db.query("SELECT COUNT(*) total FROM cabang", (e2, r2) => {
      result.total_cabang = r2[0].total;

      db.query(`
        SELECT c.nama_cabang, h.nilai
        FROM hasil_saw h
        JOIN cabang c ON h.id_cabang = c.id
        ORDER BY h.nilai DESC
        LIMIT 1
      `, (e3, r3) => {
        result.terbaik = r3.length ? r3[0].nama_cabang : "-";
        result.nilai = r3.length ? r3[0].nilai : "-";

        res.json(result);
      });
    });
  });
});

module.exports = router;
