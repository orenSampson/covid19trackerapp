const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../../../constants/auth");
const { ADMIN_TOKEN_NAME } = require("../../../constants/admin");
const { ADMIN_PASSWORD } = require("../../../constants/admin");
const {
  serverError,
  wrongPassword,
  loginSuccessful
} = require("../../../constants/responses");

module.exports = async (req, res, next) => {
  const password = req.body.password;
  const maxAge = 3600 * 1000 * 24 * 365; //one year

  let isEqual;
  let token;

  try {
    isEqual = await bcrypt.compare(password, ADMIN_PASSWORD);
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
    token = jwt.sign({ sub: 1, isAdmin: true }, ACCESS_TOKEN_SECRET, {
      expiresIn: maxAge + "ms"
    });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.cookie(ADMIN_TOKEN_NAME, token, {
    maxAge: maxAge,
    httpOnly: true
  });

  res.status(loginSuccessful.status).json({
    message: loginSuccessful.message
  });
};
