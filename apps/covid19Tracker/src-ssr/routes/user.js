const express = require("express");

const userController = require("../controllers/user");
const { authMiddleware } = require("../utils/middleware");
const { USER_TOKEN_NAME } = require("../constants/auth");

const router = express.Router();

router.get(
  "/getcountries",
  authMiddleware(USER_TOKEN_NAME),
  userController.getCountries
);

router.post(
  "/updateselected",
  authMiddleware(USER_TOKEN_NAME),
  userController.updateSelected
);

module.exports = router;
