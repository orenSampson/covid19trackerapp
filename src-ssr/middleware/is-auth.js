const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const { notAuthenticated, serverError } = require("../constants/responses");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  if (!decodedToken) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }
  next();
};
