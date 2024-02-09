require("dotenv").config();

// Import package --
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// .env --
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

const app = express();
app.use(cors());

// Url api du le Reacteur --
const url = "https://lereacteur-marvel-api.herokuapp.com";

// ROUTES -----------------

// Homepage --
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur mon site Marvel 🦸🏾!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Partie principale du site (affiche tous les characters)--
app.get("/characters", async (req, res) => {
  // Récupérer les query
  const skip = req.query.skip || 0;
  const name = req.query.name || "";

  try {
    const { data } = await axios.get(
      `${url}/characters?apiKey=${apiKey}&skip=${skip}&name=${name}`
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche un character avec ses informations --
app.get("/character/:characterId", async (req, res) => {
  try {
    // Récupérer les params (:characterId)
    const { characterId } = req.params;
    const { data } = await axios.get(
      `${url}/character/${characterId}?apiKey=${apiKey}`
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche tous les comics
app.get("/comics", async (req, res) => {
  try {
    // Récupérer les query
    const skip = req.query.skip || 0;
    const title = req.query.title || "";

    // Requête vers l'API Marvel
    const { data } = await axios.get(
      `${url}/comics?apiKey=${apiKey}&skip=${skip}&title=${title}`
    );
    // Retour des données
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche un comic dans les details d'un character --
app.get("/comic/:comicId", async (req, res) => {
  try {
    // Récupérer les query et params
    const skip = req.query.skip;
    const { comicId } = req.params;

    const { data } = await axios.get(
      `${url}/comic/${comicId}?apiKey=${apiKey}&skip=${skip}`
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche les comics d'un character --
app.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const { data } = await axios.get(
      url + "/comics/" + characterId + "?apiKey=" + apiKey
    );
    res.status(200).json({ data });
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
