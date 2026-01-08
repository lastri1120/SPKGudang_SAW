import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import db from "./backend/config/db.js"; 

// Import Routes
import kriteriaRoutes from "./backend/routes/kriteriaRoutes.js";
import penjualanRoutes from "./backend/routes/penjualanRoutes.js";
import sawRoutes from "./backend/routes/sawRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "rahasia_saw",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Proteksi Halaman
const auth = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

// API
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/saw", sawRoutes);

// Folder statis
const publicPath = path.join(process.cwd(), "frontend", "public");
app.use(express.static(publicPath));
app.use("/css", express.static(path.join(publicPath, "css")));
app.use("/js", express.static(path.join(publicPath, "js")));

// Routing Halaman
app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    if (rows.length > 0) {
      req.session.user = rows[0].username;
      return res.redirect("/");
    }
    res.send("<script>alert('Gagal!'); window.location='/login';</script>");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", auth, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;