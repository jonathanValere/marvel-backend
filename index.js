require("dotenv").config();

// Import package --
const express = require("express");
const mongoose = require("mongoose");
const mongodbUri = process.env.MONGODB_URI;
const cors = require("cors");

//Connection to DataBase
const connectToDataBase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log("Connection to database ✅");
  } catch (error) {
    console.log("error to connection! ❌");
  }
};

connectToDataBase();
// ---

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
const routesUser = require("./routes/user");
app.use(routesUser);

// Homepage --
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur mon site Marvel 🦸🏾!" });
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
