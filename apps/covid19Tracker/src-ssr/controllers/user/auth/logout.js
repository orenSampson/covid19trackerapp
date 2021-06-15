const { USER_TOKEN_NAME } = require("../../../constants/user");
const { successfulResponse } = require("../../../constants/responses");

module.exports = (req, res, next) => {
  res.clearCookie(USER_TOKEN_NAME);

  res.status(successfulResponse.status).end();
};
