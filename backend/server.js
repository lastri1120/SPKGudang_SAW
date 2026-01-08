import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import db from "./backend/config/db.js"; 

// Import Routes API
import kriteriaRoutes from "./backend/routes/kriteriaRoutes.js";
import penjualanRoutes from "./backend/routes/penjualanRoutes.js";
import sawRoutes from "./backend/routes/sawRoutes.js";
import cabangRoutes from "./backend/routes/cabangRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FOLDER STATIS (CSS, JS, Gambar) ---
const root = process.cwd();
app.use(express.static(path.join(root, "frontend")));
app.use(express.static(path.join(root, "frontend/public")));

// --- API ROUTES ---
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/cabang", cabangRoutes);
app.use("/api/saw", sawRoutes);

// --- CEK KONEKSI (Buka link-mu/api/cek) ---
app.get("/api/cek", (req, res) => {
  res.json({ message: "Server Oke, Login sudah dihapus!" });
});

// --- ROUTING HALAMAN (LANGSUNG KE INDEX) ---

// Sekarang, kalau buka halaman utama (/), langsung dikasih index.html
app.get("/", (req, res) => {
  const fileIndex = path.join(root, "frontend/public/index.html");
  const fileIndexAlt = path.join(root, "frontend/index.html");

  res.sendFile(fileIndex, (err) => {
    if (err) {
      res.sendFile(fileIndexAlt, (err2) => {
        if (err2) res.status(404).send("Error: File index.html tidak ditemukan!");
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server jalan tanpa login di port ${PORT}`));

export default app;