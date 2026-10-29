import express from "express";
import handleGenerateNewSHortURL from "../controllers/url.controller.js";

const router = express.Router();

router.post("/api/shorten", handleGenerateNewSHortURL);

export default router;
