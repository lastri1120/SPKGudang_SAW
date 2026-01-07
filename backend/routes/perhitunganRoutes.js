import express from "express";

const router = express.Router();

// Temporary simple route untuk testing
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Perhitungan endpoint is working",
    data: []
  });
});

export default router;
