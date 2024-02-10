const express = require("express");
const router = express.Router();
const axios = require("axios");
const apiKey = process.env.API_KEY;

// Url api du le Reacteur --
const url = "https://lereacteur-marvel-api.herokuapp.com";

// Partie principale du site (affiche tous les characters)--
router.get("/characters", async (req, res) => {
  try {
    // Récupérer les query
    let query = `apiKey=${apiKey}`;

    if (req.query.name) {
      query += `&name=${req.query.name}`;
    }

    if (req.query.page) {
      query += `&skip=${(req.query.page - 1) * 100}`;
    }
    // const skip = req.query.skip || 0;
    // const name = req.query.name || "";
    const { data } = await axios.get(`${url}/characters?${query}`);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Affiche un character avec ses informations --
router.get("/character/:characterId", async (req, res) => {
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

module.exports = router;
