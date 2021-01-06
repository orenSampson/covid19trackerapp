const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const { serverError } = require("../constants/responses");

module.exports = async (req, res, next) => {
  const token = req.cookies.user_access_token;

  res.locals.isAuth = false;

  if (isAuth(token)) {
    const userId = req.cookies.userId;
    if (!userId) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }

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
