import express from "express";
import handleGenerateNewSHortURL from "../controllers/url.controller.js";
import handleGetAnalytics from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", handleGenerateNewSHortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
export default router;
