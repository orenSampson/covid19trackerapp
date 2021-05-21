const express = require("express");

const adminController = require("../controllers/admin");
const { authMiddleware } = require("../utils/middleware");
const { ADMIN_ACCESS_TOKEN } = require("../constants/auth");

const router = express.Router();

router.get(
  "/getcountries",
  authMiddleware(ADMIN_ACCESS_TOKEN),
  adminController.getCountries
);

router.post(
  "/updateselected",
  authMiddleware(ADMIN_ACCESS_TOKEN),
  adminController.updateSelected
);

module.exports = router;
