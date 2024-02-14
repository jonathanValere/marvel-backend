const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    username: {
      unique: true,
      type: String,
    },
  },
  email: {
    unique: true,
    require: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
