// backend/routes/alternatifRoutes.js
import express from "express";
import {
  createAlternatif,
  getAlternatif,
  deleteAllAlternatif,
  hitungSAW, // ✅ Tambah fungsi baru
} from "../controllers/alternatifController.js";

const router = express.Router();

router.post("/", createAlternatif);
router.get("/", getAlternatif);
router.delete("/", deleteAllAlternatif);
router.post("/hitung_saw", hitungSAW); // ✅ Endpoint baru untuk SAW

export default router;
