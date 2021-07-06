const {
  serverError,
  successfulResponse
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  console.log("upload country names called");

  const countryNames = req.body.countryNames;

  console.log("countryNames :>> ", countryNames);

  res.status(successfulResponse.status).end();
};
