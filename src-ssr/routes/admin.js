const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const isServerReady = require("../middleware/is-server-ready");

const router = express.Router();

router.post("/signin", adminController.signin);

router.get(
  "/getcountries",
  isAuth,
  isServerReady,
  adminController.getCountries
);

router.post(
  "/updateselected",
  isAuth,
  isServerReady,
  adminController.updateSelected
);

module.exports = router;
