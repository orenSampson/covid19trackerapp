const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const { userNotLoggedIn } = require("../constants/responses");

module.exports = (req, res, next) => {
  const token = req.cookies.user_access_token;

  if (isAuth(token)) {
    return next();
  }

  return res
    .status(userNotLoggedIn.status)
    .json({ message: userNotLoggedIn.message });
};

const isAuth = token => {
  if (!token) {
    return false;
  }

  let decodedToken = null;

  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return false;
  }

  if (!decodedToken) {
    return false;
  }

  return true;
};
