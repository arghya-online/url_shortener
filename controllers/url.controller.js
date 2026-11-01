import shortid from "shortid";
import URL from "../models/url.model.js";

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body ?? {};

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortId = shortid.generate();

    await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(201).json(`${shortId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not create short URL" });
  }
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const url = await URL.findOne({ shortId });
  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.status(200).json({
    totalClicks: results.visitHistory.length,
    analytics: results.visitHistory.map((visit) => ({
      timestamp: visit.timestamp,
    })),
  });
}

export default handleGenerateNewShortURL;
