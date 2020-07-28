const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const isConnectedMongo = require("../middleware/is-connected-mongo");
const authController = require("../controllers/auth");
const { passwordMinLength } = require("../constants/auth");

const router = express.Router();

router.put(
  "/signup",
  [
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
      .isLength({ min: passwordMinLength })
      .withMessage(
        `Password too short. Should be at least ${passwordMinLength} characters`
      ),
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty")
  ],
  isConnectedMongo,
  authController.signup
);

// router.post("/signin", isConnectedMongo, authController.signin);

module.exports = router;
