const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const {
  serverError,
  userCreated,
  userNotFound,
  wrongPassword,
  signinSuccessful
} = require("../constants/responses");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  let hashedPassWord;

  try {
    hashedPassWord = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  const user = new User({
    email,
    password: hashedPassWord,
    name
  });

  try {
    const result = await user.save();
    res
      .status(userCreated.status)
      .json({ message: userCreated.message, userId: result._id });
  } catch (err) {
    res.status(serverError.status).json({ message: serverError.message });
  }
};

exports.signin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const email = req.body.email;
  const password = req.body.password;

  let user;
  let isEqual;
  let token;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
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
  } catch (err) {
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
    token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h"
      }
    );
    res.status(signinSuccessful.status).json({
      token,
      userId: user._id.toString(),
      message: signinSuccessful.message
    });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
};
