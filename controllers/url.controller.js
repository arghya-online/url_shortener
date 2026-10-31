import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

/**
 * Generates a new short URL
 * @param {import("express").Request} req - The request object
 * @param {import("express").Response} res - The response object
 * @returns {Promise<import("express").Response>}
 */

async function handleGenerateNewSHortURL(req, res) {
  const shortId = nanoid(8);
  const body = req.body; //user input url

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  await URL.create({
    shortId: shortId,
    redirectURL: body.url, //user input url
    visitedHistory: [],
  });

  return res.status(201).json({ id: shortId });
}

export default handleGenerateNewSHortURL;
