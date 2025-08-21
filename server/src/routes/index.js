import express from "express";
// import { getAllNotes } from "../controllers/notesController.js";
const router = express.Router();

router.get('/health',(req,res) => {
    res.status(200).json({ok: true});
});
  

export default router;
