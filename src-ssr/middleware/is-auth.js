const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../constants/auth");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
  if (!decodedToken) {
    res.status(401).json({ message: "Not authenticated." });
  }
  next();
};
