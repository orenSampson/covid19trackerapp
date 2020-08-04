const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  let hashedPassWord = null;

  try {
    hashedPassWord = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "failed generating hashed password" });
  }
  const user = new User({
    email,
    password: hashedPassWord,
    name
  });

  try {
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created on MongoDB!", userId: result._id });
  } catch (err) {
    res.status(500).json({ message: "failed creating User on MongoDB" });
  }
};

exports.signin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const email = req.body.email;
  const password = req.body.password;

  let user = null;
  let isEqual = null;
  let token = null;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "Error using MongoDB" });
  }

  if (!user) {
    return res
      .status(401)
      .json({ message: "A user with this email could not be found" });
  }

  try {
    isEqual = await bcrypt.compare(password, user.password);
  } catch (err) {
    return res.status(500).json({ message: "Error comparing passwords" });
  }

  if (!isEqual) {
    return res.status(401).json({ message: "Wrong password!" });
  }

  try {
    token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h"
      }
    );
    res.status(200).json({
      token,
      userId: user._id.toString(),
      message: "successfull sign in"
    });
  } catch (err) {
    return res.status(500).json({ message: "Error using jwt" });
  }
};
