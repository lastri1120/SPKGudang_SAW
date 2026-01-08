import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// IMPORT DATABASE (Sesuaikan folder config/db.js)
import db from "./backend/config/db.js"; 

// IMPORT ROUTES (Sesuaikan folder backend/routes/)
import cabangRoutes from "./backend/routes/kriteriaRoutes.js"; // sesuaikan nama file aslinya
import penjualanRoutes from "./backend/routes/penjualanRoutes.js";
import sawRoutes from "./backend/routes/sawRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "saw_secret",
  resave: false,
  saveUninitialized: true
}));

// Proteksi Halaman
function auth(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// 1. API Routes
app.use("/api/cabang", cabangRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/saw", sawRoutes);

// 2. Setting Folder Frontend (PENTING!)
const publicPath = path.join(process.cwd(), "frontend", "public");
const frontendRoot = path.join(process.cwd(), "frontend");

// Biar CSS & JS di folder frontend bisa terbaca
app.use(express.static(frontendRoot));

// 3. Halaman Login
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

// 4. Proses Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Pakai db.query langsung
    const [rows] = await db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password]);

    if (rows.length > 0) {
      req.session.user = rows[0].username;
      return res.redirect("/");
    }
    res.send("Login gagal!");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

// 5. Halaman Utama
app.get("/", auth, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Jalan di http://localhost:${PORT}`));

export default app;