const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ADMIN_PASSWORD } = require("../constants/admin");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const {
  serverError,
  wrongPassword,
  signinSuccessful
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
