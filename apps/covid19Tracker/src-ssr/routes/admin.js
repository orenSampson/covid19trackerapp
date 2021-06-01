const express = require("express");

const adminController = require("../controllers/admin");
const { authMiddleware } = require("../utils/middleware");
const { ADMIN_TOKEN_NAME } = require("../constants/auth");

const router = express.Router();

router.post("/login", adminController.login);

router.get("/logout", adminController.logout);

router.post(
  "/getcountries",
  authMiddleware(ADMIN_TOKEN_NAME),
  adminController.getCountries
);

router.post(
  "/updateselected",
  authMiddleware(ADMIN_TOKEN_NAME),
  adminController.updateSelected
);

module.exports = router;
