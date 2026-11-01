import express from "express";
import urlRoutes from "./routes/url.routes.js";
import { connectToMongoDB } from "./connectDB.js";
import URL from "./models/url.model.js";

const app = express();
const PORT = 8001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/url", urlRoutes);

connectToMongoDB("mongodb://127.0.0.1:27017/url_shortener")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );

  return res.redirect((await URL.findOne({ shortId })).redirectURL);
});
