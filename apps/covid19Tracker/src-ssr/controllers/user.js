const User = require("covid-db/models/user");
const AdminCountry = require("covid-db/models/adminCountry");
const CountriesSummary = require("covid-db/models/countriesSummary");
const {
  serverError,
  successfulResponse,
  userNotLoggedIn
} = require("../constants/responses");

async function getUserCountries(userId) {
  const { selectedCountries } = await User.findOne(
    { _id: userId },
    "-_id selectedCountries"
  ).lean();
  return selectedCountries || [];
}

function getAllSelectedCountries() {
  return AdminCountry.find({ isSelected: true }).lean();
}

exports.getCountries = async (req, res, next) => {
  const userId = res.locals.payload && res.locals.payload.sub;

  let countriesSummary;
  try {
    countriesSummary = await CountriesSummary.findOne({});
    countriesSummary = countriesSummary.countries;
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let userCountries;

  try {
    const [userSelectedCountries, allCountries] = await Promise.all([
      res.locals.isAuth ? getUserCountries(userId) : Promise.resolve([]),
      getAllSelectedCountries()
    ]);

    const userSelectedCountriesIds = new Set(
      userSelectedCountries.map(id => id.toString())
    );

    userCountries = allCountries.map(country => ({
      _id: country._id,
      slug: country.slug,
      isSelected: userSelectedCountriesIds.has(country._id.toString())
    }));
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const userSlugsMap = new Map(
    userCountries.map(country => [country.slug, country])
  );
  countriesSummary = countriesSummary.filter(({ slug }) => {
    return userSlugsMap.has(slug);
  });

  countriesSummary = countriesSummary.map(item => {
    const country = userSlugsMap.get(item.slug);
    return {
      countryId: country._id.toString(),
      countryName: item.countryName,
      slug: item.slug,
      isSelected: country.isSelected,
      totalConfirmed: item.totalConfirmed,
      newConfirmed: item.newConfirmed,
      totalDeaths: item.totalDeaths,
      totalRecovered: item.totalRecovered
    };
  });

  return res.status(successfulResponse.status).json({ data: countriesSummary });
};

exports.updateSelected = async (req, res, next) => {
  if (!res.locals.isAuth) {
    return res
      .status(userNotLoggedIn.status)
      .json({ message: userNotLoggedIn.message });
  }

  const userId = res.locals.payload.sub;
  const countryId = req.body.countryId;
  const isSelectedNewVal = req.body.isSelectedNewVal;

  let user;

  try {
    user = await User.findOne({ _id: userId }, "selectedCountries");
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!user) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (isSelectedNewVal) {
    user.selectedCountries.push(countryId);
  } else {
    user.selectedCountries = user.selectedCountries.filter(
      selectedCountryId => selectedCountryId.toString() !== countryId
    );
  }

  try {
    await user.save();
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(successfulResponse.status).end();
};
