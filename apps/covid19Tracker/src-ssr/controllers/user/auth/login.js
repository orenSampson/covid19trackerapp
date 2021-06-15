const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("covid-db/models/user");
const { ACCESS_TOKEN_SECRET } = require("../../../constants/auth");
const { USER_TOKEN_NAME } = require("../../../constants/user");
const {
  serverError,
  userNotFound,
  wrongPassword,
  loginSuccessful
} = require("../../../constants/responses");

module.exports = async (req, res, next) => {
  const maxAge = 365;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const email = req.body.email;
  const password = req.body.password;

  let user, isEqual, token;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  if (!user) {
    return res
      .status(userNotFound.status)
      .json({ message: userNotFound.message });
  }

  try {
    isEqual = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  if (!isEqual) {
    return res
      .status(wrongPassword.status)
      .json({ message: wrongPassword.message });
  }

  try {
    token = jwt.sign({ sub: user._id, isAdmin: false }, ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge + "d"
    });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.cookie(USER_TOKEN_NAME, token, {
    maxAge: maxAge * 24 * 60 * 60 * 1000,
    httpOnly: true
  });

  res.status(loginSuccessful.status).json({
    message: loginSuccessful.message
  });
};
