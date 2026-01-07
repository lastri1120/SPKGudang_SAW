import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/hitung", async (req, res) => {
  try {
    const [cabang] = await db.promise().query("SELECT id, nama_cabang FROM cabang");

    const [nilai] = await db.promise().query(`
      SELECT 
        p.cabang_id,
        SUM(CASE WHEN p.kriteria_id = 1 THEN p.nilai END) AS C1,
        SUM(CASE WHEN p.kriteria_id = 2 THEN p.nilai END) AS C2,
        SUM(CASE WHEN p.kriteria_id = 3 THEN p.nilai END) AS C3,
        SUM(CASE WHEN p.kriteria_id = 4 THEN p.nilai END) AS C4
      FROM penilaian p
      GROUP BY p.cabang_id
    `);

    const [bobot] = await db.promise().query("SELECT kode_kriteria, bobot FROM kriteria ORDER BY id ASC");

    let maxC1 = Math.max(...nilai.map(n => n.C1));
    let maxC2 = Math.max(...nilai.map(n => n.C2));
    let maxC3 = Math.max(...nilai.map(n => n.C3));
    let minC4 = Math.min(...nilai.map(n => n.C4));

    const normalisasi = nilai.map(n => ({
      cabang_id: n.cabang_id,
      nC1: n.C1 / maxC1,
      nC2: n.C2 / maxC2,
      nC3: n.C3 / maxC3,
      nC4: minC4 / n.C4
    }));

    const hasil = cabang.map(c => {
      const n = normalisasi.find(x => x.cabang_id === c.id);
      const nilaiAkhir =
        (n?.nC1 || 0) * bobot[0].bobot +
        (n?.nC2 || 0) * bobot[1].bobot +
        (n?.nC3 || 0) * bobot[2].bobot +
        (n?.nC4 || 0) * bobot[3].bobot;

      return {
        cabang_id: c.id,
        nama_cabang: c.nama_cabang,
        nilai: Number(nilaiAkhir.toFixed(4))
      };
    });

    hasil.sort((a, b) => b.nilai - a.nilai);
    hasil.forEach((h, i) => h.ranking = i + 1);

    await db.promise().query("TRUNCATE hasil_saw");

    for (const h of hasil) {
      await db.promise().query(
        "INSERT INTO hasil_saw(cabang_id, nama_cabang, nilai, ranking) VALUES (?, ?, ?, ?)",
        [h.cabang_id, h.nama_cabang, h.nilai, h.ranking]
      );
    }

    res.json({ success: true, hasil });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/ranking", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM hasil_saw ORDER BY ranking ASC");
    res.json({ success: true, hasil: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
