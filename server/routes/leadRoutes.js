import express from "express";
import { createLead, getLeads, updateLead, deleteLead, getStats } from "../controllers/leadController.js";
import protect, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createLead);
router.get("/stats", getStats);          // admin → all leads stats; user → own stats
router.get("/", getLeads);               // admin → all leads; user → own leads
router.put("/:id", updateLead);          // admin → any lead; user → own lead
router.delete("/:id", deleteLead);       // admin → any lead; user → own lead

// Admin-only: list all users (useful for admin panel later)
router.get("/admin/all", adminOnly, getLeads);

export default router;
