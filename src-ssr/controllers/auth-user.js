const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const AdminCountry = require("../models/adminCountry");
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

  let countriesSelected;

  try {
    countriesSelected = await AdminCountry.find(
      { isSelected: true },
      "_id"
    );
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!countriesSelected) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const newCountriesSelected = countriesSelected.map(item => {
    return {
      _id: item._id,
      isSelected: false
    };
  });

  const user = new User({
    email,
    password: hashedPassWord,
    name,
    countries: newCountriesSelected
  });

  try {
    const result = await user.save();
    return res
      .status(userCreated.status)
      .json({ message: userCreated.message, userId: result._id });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
};


exports.signin = async (req, res, next) => {
  const maxAge = 3600 * 1000; //one hour in milliseconds

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
    token = jwt.sign({}, ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge + "ms"
    });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.cookie("user_access_token", token, {
    maxAge: maxAge,
    httpOnly: true
  });

  res.cookie("userId", user._id.toString(), {
    maxAge: maxAge,
    httpOnly: true
  });

  res.status(signinSuccessful.status).json({
    message: signinSuccessful.message
  });
};
