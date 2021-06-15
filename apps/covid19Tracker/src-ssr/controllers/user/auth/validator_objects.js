const { body } = require("express-validator");

const User = require("covid-db/models/user");
const { PASSWORD_MIN_LENGTH } = require("../../../constants/auth");
const {
  emptyNameMsg,
  notValidEmailMsg,
  emailInUseMsg,
  passwordTooShortMsg
} = require("../../../constants/responses");

exports.signupValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(emptyNameMsg),
  body("email")
    .isEmail()
    .withMessage(notValidEmailMsg)
    .normalizeEmail()
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject();
      }
    })
    .withMessage(emailInUseMsg),
  body("password")
    .trim()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(passwordTooShortMsg)
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage(notValidEmailMsg)
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(passwordTooShortMsg)
];
