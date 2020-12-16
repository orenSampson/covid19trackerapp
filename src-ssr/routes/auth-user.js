const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth-user");
const { PASSWORD_MIN_LENGTH } = require("../constants/auth");

const router = express.Router();

router.get("/logout", authController.logout);

router.put(
  "/signup",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject(
              "E-mail already in use. Please choose another email"
            );
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: PASSWORD_MIN_LENGTH })
      .withMessage(
        `Password too short. Should be at least ${PASSWORD_MIN_LENGTH} characters`
      )
  ],
  authController.signup
);

router.post(
  "/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: PASSWORD_MIN_LENGTH })
      .withMessage(
        `Password too short. Should be at least ${PASSWORD_MIN_LENGTH} characters`
      )
  ],
  authController.signin
);

module.exports = router;
