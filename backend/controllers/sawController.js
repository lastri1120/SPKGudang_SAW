import db from "../config/db.js";

export const hitungSAW = (req, res) => {
  const sqlKriteria = `SELECT id, kode_kriteria, tipe, bobot FROM kriteria`;
  const sqlCabang = `SELECT id, nama_cabang FROM cabang`;
  const sqlPenjualan = `SELECT cabang_id, produk, jumlah FROM penjualan`;

  db.query(sqlKriteria, (err, kriterias) => {
    if (err) return res.status(500).json({ success: false, message: "Gagal ambil kriteria" });

    db.query(sqlCabang, (err, cabangs) => {
      if (err) return res.status(500).json({ success: false, message: "Gagal ambil cabang" });

      db.query(sqlPenjualan, (err, sales) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal ambil penjualan" });

        // ==== Persiapan nilai per kriteria ====
        let dataCabang = cabangs.map(c => ({
          id: c.id,
          nama: c.nama_cabang,
          nilai: {}
        }));

        dataCabang.forEach(c => {
          kriterias.forEach(k => {
            c.nilai[k.kode_kriteria] = 0;
          });
        });

        // ==== Isi nilai C1, C2, C3, C4 dari penjualan ====
        sales.forEach(s => {
          const cabang = dataCabang.find(c => c.id == s.cabang_id);
          if (!cabang) return;

          kriterias.forEach(k => {
            if (k.kode_kriteria == "C1") cabang.nilai["C1"] += s.jumlah;
            if (k.kode_kriteria == "C2") cabang.nilai["C2"] += 1;
            if (k.kode_kriteria == "C3") cabang.nilai["C3"] = Math.max(cabang.nilai["C3"], s.jumlah);
            if (k.kode_kriteria == "C4") cabang.nilai["C4"] += s.jumlah;
          });
        });

        // ==== Cari max/min untuk normalisasi ====
        const maxValues = {};
        const minValues = {};

        kriterias.forEach(k => {
          const arr = dataCabang.map(c => c.nilai[k.kode_kriteria]);
          maxValues[k.kode_kriteria] = Math.max(...arr);
          minValues[k.kode_kriteria] = Math.min(...arr);
        });

        // ==== Normalisasi dan hitung skor ====
        dataCabang.forEach(c => {
          c.skor = 0;
          kriterias.forEach(k => {
            const val = c.nilai[k.kode_kriteria];
            let norm = 0;

            if (k.tipe === "benefit") {
              norm = maxValues[k.kode_kriteria] ? val / maxValues[k.kode_kriteria] : 0;
            } else {
              norm = val ? minValues[k.kode_kriteria] / val : 0;
            }

            c.skor += norm * k.bobot;
          });
        });

        // ==== Sorting ranking ====
        dataCabang.sort((a, b) => b.skor - a.skor);

        // ==== Simpan ke tabel hasil_saw ====
        db.query("TRUNCATE TABLE hasil_saw", () => {
          const insertSQL = `INSERT INTO hasil_saw (cabang_id, skor) VALUES (?, ?)`;

          dataCabang.forEach(c => {
            db.query(insertSQL, [c.id, c.skor.toFixed(3)]);
          });

          res.json({ success: true, message: "Perhitungan selesai dan ranking tersimpan!" });
        });
      });
    });
  });
};

export const getRanking = (req, res) => {
  const sql = `
    SELECT h.id, h.cabang_id, c.nama_cabang, h.skor
    FROM hasil_saw h
    JOIN cabang c ON h.cabang_id = c.id
    ORDER BY h.skor DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: "Gagal ambil ranking" });

    const result = rows.map((r, i) => ({
      ranking: i + 1,
      cabang: r.nama_cabang,
      skor: r.skor
    }));

    res.json(result);
  });
};
