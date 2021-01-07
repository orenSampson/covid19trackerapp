const { authMiddleware } = require("../utils/middleware");

exports.getCountries = (req, res, next) => {
  const token = req.cookies.user_access_token;

  authMiddleware(token, res, next);
};

exports.updateSelected = (req, res, next) => {
  const token = req.cookies.user_access_token;

  authMiddleware(token, res, next);
};
