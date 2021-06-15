const User = require("covid-db/models/user");
const AdminCountry = require("covid-db/models/adminCountry");
const CountrySummary = require("covid-db/models/countrySummary");
const {
  serverError,
  successfulResponse
} = require("../../constants/responses");

async function getUserSelectedCountries(userId) {
  const { selectedCountries } = await User.findOne(
    { _id: userId },
    "-_id selectedCountries"
  ).lean();
  return selectedCountries || [];
}

function getAdminSelectedCountries() {
  return AdminCountry.find({ isSelected: true }, "-_id").lean();
}

module.exports = async (req, res, next) => {
  const userId = res.locals.payload && res.locals.payload.sub;

  let countrySummary;
  try {
    countrySummary = await CountrySummary.find({});
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let userSelectedSlugsSet, adminSelectedSlugsSet;
  try {
    const [userSelectedSlugs, adminSelectedCountries] = await Promise.all([
      res.locals.isAuth
        ? getUserSelectedCountries(userId)
        : Promise.resolve([]),
      getAdminSelectedCountries()
    ]);

    userSelectedSlugsSet = new Set(userSelectedSlugs);
    adminSelectedSlugsSet = new Set(
      adminSelectedCountries.map(country => country.slug)
    );

    // console.log("userSelectedSlugsSet :>> ", userSelectedSlugsSet);
    // console.log("adminSelectedSlugsSet :>> ", adminSelectedSlugsSet);
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  countrySummary = countrySummary.filter(({ slug }) => {
    return adminSelectedSlugsSet.has(slug);
  });

  countrySummary = countrySummary.map(item => {
    return {
      countryName: item.countryName,
      slug: item.slug,
      isSelected: userSelectedSlugsSet.has(item.slug),
      totalConfirmed: item.totalConfirmed,
      newConfirmed: item.newConfirmed,
      totalDeaths: item.totalDeaths,
      totalRecovered: item.totalRecovered
    };
  });

  // console.log("countrySummary :>> ", countrySummary);

  return res.status(successfulResponse.status).json({ data: countrySummary });
};
