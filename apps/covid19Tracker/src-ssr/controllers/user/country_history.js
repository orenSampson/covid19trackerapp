const AdminCountry = require("covid-db/models/adminCountry");
const CountryHistory = require("covid-db/models/countryHistory");
const {
  notAllowed,
  serverError,
  successfulResponse
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  const from = req.query.from;
  const to = req.query.to;
  const slug = req.query.slug;

  let adminCountries;
  try {
    adminCountries = await AdminCountry.find({ isSelected: true }).lean();
    if (!adminCountries) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const adminSlugsSet = new Set(adminCountries.map(country => country.slug));
  if (!adminSlugsSet.has(slug)) {
    return res.status(notAllowed.status).json({ message: notAllowed.message });
  }

  let countryHistoryArr;
  try {
    countryHistoryArr = await CountryHistory.aggregate([
      { $match: { slug: slug } },
      { $project: { countryData: 1, _id: 0 } },
      { $unwind: "$countryData" },
      {
        $match: {
          "countryData.date": {
            $gte: new Date(from),
            $lte: new Date(to)
          }
        }
      }
    ]);
    countryHistoryArr = countryHistoryArr.map(country => ({
      date: country.countryData.date.toISOString(),
      cases: country.countryData.totalConfirmed,
      deaths: country.countryData.totalDeaths
    }));
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res
    .status(successfulResponse.status)
    .json({ data: countryHistoryArr });
};
