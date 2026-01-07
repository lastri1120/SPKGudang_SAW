import express from "express";
import session from "express-session";
import cors from "cors";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import cabangRoutes from "./routes/cabangRoutes.js";
import penjualanRoutes from "./routes/penjualanRoutes.js";
import kriteriaRoutes from "./routes/kriteriaRoutes.js";
import sawRoutes from "./routes/sawRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
  secret: "saw_secret",
  resave: false,
  saveUninitialized: true
}));

// auth middleware
function auth(req, res, next){
  if(!req.session.user) return res.redirect("/");
  next();
}

// Routes API
app.use("/api/cabang", cabangRoutes);
app.use("/api/penjualan", penjualanRoutes);
app.use("/api/kriteria", kriteriaRoutes);
app.use("/api/saw", sawRoutes);

// serve static frontend (supaya login.html, css, js kebaca)
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/index.html", auth, (req, res) => {
  res.sendFile("C:/xampp/htdocs/spkgudang_saw/frontend/public/index.html");
});

// halaman login dari file
app.get("/login", (req, res) => {
  res.sendFile("C:/xampp/htdocs/spkgudang_saw/frontend/public/login.html");
});

// proses login ke DB
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.promise().query(
  "SELECT * FROM users WHERE username=? AND password=?",
  [username, password]
);

    if(rows.length > 0){
  req.session.user = rows[0].username;
  return res.redirect("/index.html");
}


    res.send("Login gagal!");
  } catch(err){
    res.send("Error login: " + err.message);
  }
});

// halaman index setelah login (file html kamu)
app.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});


// logout harus sebelum express.static kalau ada masalah
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// serve static frontend
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.listen(3000, ()=> console.log("🚀 Server running di http://localhost:3000"));
export default app;
