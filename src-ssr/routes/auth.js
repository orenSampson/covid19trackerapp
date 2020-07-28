const express = require("express");

const User = require("../models/user");
const isConnectedMongo = require("../middleware/is-connected-mongo");
const authController = require("../controllers/auth");

const router = express.Router();

router.put("/signup", isConnectedMongo, authController.signup);

module.exports = router;
