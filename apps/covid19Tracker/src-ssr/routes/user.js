const express = require("express");

const userController = require("../controllers/user");
const { authMiddleware } = require("../utils/middleware");
const { USER_TOKEN_NAME } = require("../constants/user");
const {
  signupValidator,
  loginValidator
} = require("../controllers/user/auth/validator_objects");

const router = express.Router();

router.post("/logout", userController.logout);

router.put("/signup", signupValidator, userController.signup);

router.post("/login", loginValidator, userController.login);

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
