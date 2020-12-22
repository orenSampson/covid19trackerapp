const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ADMIN_PASSWORD } = require("../constants/admin");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const {
  serverError,
  wrongPassword,
  signinSuccessful,
  successfulResponse
} = require("../constants/responses");

exports.logout = (req, res, next) => {
  res.cookie("admin_access_token", "", {
    maxAge: 1,
    httpOnly: true
  });

  res.status(successfulResponse.status).end();
};

exports.login = async (req, res, next) => {
  const password = req.body.password;
  const maxAge = 3600 * 1000; //one hour in milliseconds

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
      expiresIn: maxAge + "ms"
    });
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.cookie("admin_access_token", token, {
    maxAge: maxAge,
    httpOnly: true
  });

  res.status(signinSuccessful.status).json({
    message: signinSuccessful.message
  });
};