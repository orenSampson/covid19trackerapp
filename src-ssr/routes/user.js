const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const isServerReady = require("../middleware/is-server-ready");

const router = express.Router();

router.get("/getcountries", isAuth, isServerReady, userController.getCountries);

router.post(
  "/updateselected",
  isAuth,
  isServerReady,
  userController.updateSelected
);

module.exports = router;
