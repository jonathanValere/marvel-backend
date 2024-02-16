const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Import du model
const User = require("../models/User");
// Package pour le password
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const fileUpload = require("express-fileupload");

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    // Vérifier si l'email existe dans la base de données
    const user = await User.findOne({ email: req.body.email });
    const isUserNameExists = await User.findOne({
      account: { username: req.body.username },
    });

    // Si le mail ou le username existent, émettre un message d'erreur
    if (user || isUserNameExists) {
      throw new Error("Username or/and email already exists !");
    }

    // Vérifier si les champs sont remplis
    if (req.body.username && req.body.password && req.body.email) {
      // Etape 1 : Encrypter le mot de passe
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(req.body.password + salt).toString(encBase64);

      // Etape 2 : Créer le nouvel utilisateur
      const newUser = new User({
        email: req.body.email,
        token: token,
        hash: hash,
        salt: salt,
        account: {
          username: req.body.username,
        },
      });

      // Etape 3 : Sauvegarder le nouvel utilisateur dans la base de données
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        token: newUser.token,
        account: newUser.account,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", fileUpload(), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // renvoie les données de l'utilisateur trouvé (type objet) ou null

    if (user) {
      // Vérifier si le mot de passe est correct
      if (
        SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
      ) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(500).json({ message: "Email or/and password wrong!" });
      }
    } else {
      throw new Error("This account doesn't exist!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    const token = req.params.id;
    const user = await User.findOne({ token });
    res
      .status(200)
      .json({ id: user._id, account: user.account, favorites: user.favorites });
  } catch (error) {}
});

module.exports = router;
