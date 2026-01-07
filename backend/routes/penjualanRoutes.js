import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all penjualan
router.get("/", (req, res) => {
  const sql = `
    SELECT p.id, p.cabang_id, c.nama_cabang, p.produk, p.jumlah, p.created_at
    FROM penjualan p
    JOIN cabang c ON p.cabang_id = c.id
    ORDER BY p.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD penjualan
router.post("/", async (req, res) => {
  const { cabang_id, produk, jumlah } = req.body;

  if (!cabang_id || !produk || jumlah === undefined) {
    return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
  }

  if (parseInt(jumlah) < 1) {
    return res.status(400).json({ success: false, message: "Jumlah terjual tidak boleh 0!" });
  }

  try {
    await db.query(
      "INSERT INTO penjualan (cabang_id, produk, jumlah) VALUES (?,?,?)",
      [cabang_id, produk, parseInt(jumlah)]
    );

    res.json({ success: true, message: "Data penjualan berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal tambah data penjualan!" });
  }
});

// EDIT penjualan
router.put("/:id", async (req, res) => {
  const { produk, jumlah } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE penjualan SET produk = ?, jumlah = ? WHERE id = ?",
      [produk, jumlah, id]
    );

    res.json({ success: true, message: "Data penjualan berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Berhasil update penjualan!" });
  }
});

// DELETE penjualan
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM penjualan WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Penjualan berhasil dihapus" });
  });
});

export default router;
