const { ADMIN_TOKEN_NAME } = require("../../constants/admin");
const { successfulResponse } = require("../../constants/responses");

module.exports = async (req, res, next) => {
  res.clearCookie(ADMIN_TOKEN_NAME);

  res.status(successfulResponse.status).end();
};
