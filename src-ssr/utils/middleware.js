const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");

exports.authMiddleware = (token, res, next) => {
  res.locals.isAuth = false;

  if (isAuth(token)) {
    res.locals.isAuth = true;
  }

  return next();
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
