import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 1. IMPORT DATABASE (Sesuaikan dengan file db.js temanmu)
import db from "./backend/config/db.js"; 

// 2. IMPORT ROUTES
import kriteriaRoutes from "./backend/routes/kriteriaRoutes.js";
import penjualanRoutes from "./backend/routes/penjualanRoutes.js";
import sawRoutes from "./backend/routes/sawRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Session
app.use(session({
  secret: "saw_secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true jika menggunakan HTTPS
}));

// Middleware Proteksi (Auth)
function auth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// 3. API ROUTES
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/saw", sawRoutes);

// 4. SETTING FOLDER FRONTEND
const publicPath = path.join(process.cwd(), "frontend", "public");

// Melayani file statis (CSS, JS, Images)
app.use(express.static(path.join(process.cwd(), "frontend")));
app.use(express.static(publicPath));

// 5. ROUTE HALAMAN LOGIN
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

// 6. PROSES LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Query ke tabel users
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?", 
      [username, password]
    );

    if (rows.length > 0) {
      req.session.user = rows[0].username;
      return res.redirect("/");
    } else {
      res.send("<script>alert('Login Gagal! Username atau Password Salah'); window.location='/login';</script>");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Server: " + err.message);
  }
});

// 7. HALAMAN UTAMA (INDEX) - Harus Login
app.get("/", auth, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// 8. LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// JALANKAN SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});

export default app;