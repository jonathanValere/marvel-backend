require("dotenv").config();

// Import package --
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// .env --
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES -----------------
// Improt des routes--
const routesComic = require("./routes/comic");
app.use(routesComic);
const routesCharacter = require("./routes/character");
app.use(routesCharacter);

// Homepage --
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur mon site Marvel 🦸🏾!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/user/signup", (req, res) => {
  try {
    console.log("body >>>>", req.body);
    res.status(200).json({ message: "Bienvenue" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche la page non trouvée --
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Démarrer le server --
app.listen(port, () => {
  console.log("Server started 🔥");
});
