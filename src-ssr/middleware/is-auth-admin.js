const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const { notAuthenticated, serverError } = require("../constants/responses");

module.exports = (req, res, next) => {
  const token = req.cookies.admin_access_token;

  if (!token) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  let decodedToken = null;

  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  if (!decodedToken) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  next();
};
