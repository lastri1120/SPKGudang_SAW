import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Pastikan file db.js kamu sudah pakai export default
import db from "./backend/config/db.js"; 

// Import Routes (Pastikan file-file ini ada di folder backend/routes/)
import kriteriaRoutes from "./backend/routes/kriteriaRoutes.js";
import penjualanRoutes from "./backend/routes/penjualanRoutes.js";
import sawRoutes from "./backend/routes/sawRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session untuk Login
app.use(session({
  secret: "rahasia_saw_123",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ubah jadi true kalau pakai HTTPS/Produksi
}));

// Proteksi Halaman (Supaya tidak bisa masuk kalau belum login)
const auth = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

// API Routes
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/saw", sawRoutes);

// Folder Statis (PENTING: Mengarah ke frontend/public)
const publicPath = path.join(process.cwd(), "frontend", "public");
app.use(express.static(publicPath));
app.use("/css", express.static(path.join(publicPath, "css")));
app.use("/js", express.static(path.join(publicPath, "js")));

// --- ROUTING HALAMAN ---

// 1. Halaman Login
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

// 2. Proses Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Ambil data user dari database Railway
    const [rows] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    
    if (rows.length > 0) {
      req.session.user = rows[0].username;
      return res.redirect("/");
    }
    // Jika gagal
    res.send("<script>alert('Login Gagal! Cek Username/Password'); window.location='/login';</script>");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error: " + err.message);
  }
});

// 3. Halaman Utama (Index) - Diproteksi Auth
app.get("/", auth, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// 4. Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// 5. Cek Koneksi (Untuk Testing)
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", time: new Date() });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});

export default app;