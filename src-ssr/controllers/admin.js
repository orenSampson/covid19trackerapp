const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ADMIN_PASSWORD } = require("../constants/admin");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");

exports.signin = async (req, res, next) => {
  const password = req.body.password;

  let isEqual = null;
  let token = null;

  try {
    isEqual = await bcrypt.compare(password, ADMIN_PASSWORD);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server Error. Error using bcrypt" });
  }

  if (!isEqual) {
    return res.status(401).json({ message: "Wrong password!" });
  }

  try {
    token = jwt.sign({}, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h"
    });
    res.status(200).json({
      token,
      message: "successfull sign in"
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error. Error using jwt" });
  }
};
