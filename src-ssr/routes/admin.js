const express = require("express");

const adminController = require("../controllers/admin");
const isAuthAdmin = require("../middleware/is-auth-admin");
const isServerReady = require("../middleware/is-server-ready");

const router = express.Router();

router.post("/signin", adminController.signin);

router.get(
  "/getcountries",
  isAuthAdmin,
  isServerReady,
  adminController.getCountries
);

router.post(
  "/updateselected",
  isAuthAdmin,
  isServerReady,
  adminController.updateSelected
);

module.exports = router;
