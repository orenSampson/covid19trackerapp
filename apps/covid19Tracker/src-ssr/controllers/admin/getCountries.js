const AdminCountry = require("covid-db/models/adminCountry");
const {
  serverError,
  notAuthenticated,
  successfulResponse
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  if (!res.locals.isAdmin) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  let adminCountriesArr;
  try {
    adminCountriesArr = await AdminCountry.find({}, "-_id").sort({
      countryName: 1
    });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  if (!adminCountriesArr) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(successfulResponse.status).json({ data: adminCountriesArr });
};
