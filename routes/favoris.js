const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const fileUpload = require("express-fileupload");

router.get("/favoris", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      const favorites = user.favorites;
      res.status(200).json({ favorites });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/favoris/:item/add/:id",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      //item = "characters" ou "comics", id= id du character ou du comic
      const { item, id } = req.params;
      // req.user provient du middleware isAuthenticated
      const user = req.user;
      if (user) {
        // Insérer dans le tableau favorites.(...)
        if (item === "characters") {
          user.favorites.characters.push(id);
        }
        if (item === "comics") {
          user.favorites.comics.push(id);
        }
        // sauvegarde de user
        await user.save();
      }
      // Returne un objet
      res.status(200).json({
        id: user._id,
        favorites: user.favorites,
        token: user.token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/favoris/:item/remove/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const { item, id } = req.params;
      const user = req.user;

      if (user.favorites[item]) {
        const index = user.favorites[item].indexOf(id);
        if (index === -1) {
          throw new Error("This item doesn't exist in yours favorites!");
        }
        user.favorites[item].splice(index, 1);
        await user.save();
      }
      res.status(200).json({ message: "item deleted to favorites" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
