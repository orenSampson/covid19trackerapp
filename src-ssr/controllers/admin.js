const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminCountry = require("../models/adminCountry");
const { ADMIN_PASSWORD } = require("../constants/admin");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const {
  serverError,
  wrongPassword,
  signinSuccessful,
  successfulResponse
} = require("../constants/responses");

exports.signin = async (req, res, next) => {
  const password = req.body.password;

  let isEqual;
  let token;

  try {
    isEqual = await bcrypt.compare(password, ADMIN_PASSWORD);
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
      expiresIn: "1h"
    });
    res.status(signinSuccessful.status).json({
      token,
      message: signinSuccessful.message
    });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
};

exports.getCountries = async (req, res, next) => {
  let countriesArr;

  try {
    countriesArr = await AdminCountry.find().sort({ country: 1 });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!countriesArr) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const newCountriesArr = countriesArr.map(item => {
    return {
      _id: item._id,
      country: item.country,
      isSelected: item.isSelected
    };
  });

  res.status(successfulResponse.status).json({ data: newCountriesArr });
};

exports.updateSelected = async (req, res, next) => {
  const id = req.body.id;
  const isSelectedNewVal = req.body.isSelectedNewVal;

  let doc;
  try {
    doc = await AdminCountry.findOneAndUpdate(
      { _id: id },
      { isSelected: isSelectedNewVal },
      { new: true }
    );
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!doc) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(successfulResponse.status).end();
};
