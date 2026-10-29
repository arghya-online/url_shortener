import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

async function handleGenerateNewSHortURL(req, res) {
  const shortId = nanoid(8);
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  });

  return res.status(201).json({ id: shortId });
}

export default handleGenerateNewSHortURL;
