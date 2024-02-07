require("dotenv").config();
const express = require("express");
const port = 3000;
const cors = require("cors");

const app = express();
app.use(cors());

// Homepage du site
app.get("/characters", (req, res) => {
  try {
    res.status(200).json({ message: "bienvenue" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(port, (req, res) => {
  console.log("Server started 🔥");
});
