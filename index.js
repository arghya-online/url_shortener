import express from "express";
import { router } from "express";
import urlRoutes from "./routes/url.routes.js";
import { connectToMongoDB } from "./connectDB.js";
const app = express();

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/url_shortener").then(() => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/api/shorten", (req, res) => {
  const { url } = req.query;
});

app.use("/url", urlRoutes);
