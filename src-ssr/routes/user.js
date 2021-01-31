const express = require("express");

const userController = require("../controllers/user");
const { authMiddleware } = require("../utils/middleware");
const { USER_ACCESS_TOKEN } = require("../constants/auth");

const router = express.Router();

router.get(
  "/getcountries",
  authMiddleware(USER_ACCESS_TOKEN),
  userController.getCountries
);

router.post(
  "/updateselected",
  authMiddleware(USER_ACCESS_TOKEN),
  userController.updateSelected
);

module.exports = router;
