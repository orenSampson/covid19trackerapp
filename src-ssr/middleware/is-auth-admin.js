const { authMiddleware } = require("../utils/middleware");

module.exports = (req, res, next) => {
  const token = req.cookies.admin_access_token;

  authMiddleware(token, res, next);
};
