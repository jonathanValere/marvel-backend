const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = process.env.API_KEY;

// Url api du le Reacteur --
const url = "https://lereacteur-marvel-api.herokuapp.com";

// Affiche tous les comics
router.get("/comics", async (req, res) => {
  try {
    // Récupérer les query
    let query = `apiKey=${apiKey}`;

    if (req.query.title) {
      query += `&title=${req.query.title}`;
    }

    if (req.query.page) {
      query += `&skip=${(req.query.page - 1) * 100}`;
    }
    // const skip = req.query.skip || 0;
    // const title = req.query.title || "";

    // Requête vers l'API Marvel
    const { data } = await axios.get(`${url}/comics?${query}`);
    // Retour des données
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer les comics d'un character --
router.get("/comics/:characterId", async (req, res) => {
  try {
    // Récupérer Id du character
    const { characterId } = req.params;
    // récupérer les comics liés au character
    const { data } = await axios.get(
      `${url}/comics/${characterId}?apiKey=${apiKey}`
    );
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche un comic avec les details  --
router.get("/comic/:comicId", async (req, res) => {
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

module.exports = router;
