const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");

exports.authMiddleware = tokenName => (req, res, next) => {
  let token;

  if (req.cookies[tokenName]) {
    token = req.cookies[tokenName];
  } else {
    token = req.headers[tokenName]
      ? req.headers[tokenName].split(" ")[1]
      : null;
  }

  res.locals.payload = getPayload(token);

  res.locals.isAuth = !!res.locals.payload;

  res.locals.isAdmin = res.locals.isAuth && res.locals.payload.isAdmin;

  return next();
};

const getPayload = token => {
  if (!token) {
    return null;
  }

  let decodedTokenPayload;
  try {
    decodedTokenPayload = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
  if (!decodedTokenPayload) {
    return null;
  }

  return decodedTokenPayload;
};
