const axios = require("axios");

const User = require("../models/user");
const AdminCountry = require("../models/adminCountry");
const { COVID_BASE_URL } = require("../constants/covid19");
const { NOTLOGGEDINUSERID } = require("../constants/user");
const {
  serverError,
  successfulResponse,
  userNotLoggedIn
} = require("../constants/responses");

exports.getCountries = async (req, res) => {
  if (res.locals.isAuth && !req.cookies.userId) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let countriesSummary;

  try {
    countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (
    !(
      countriesSummary &&
      countriesSummary.data &&
      countriesSummary.data.Countries
    )
  ) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  countriesSummary = countriesSummary.data.Countries;

  let userId;
  if (res.locals.isAuth) {
    userId = req.cookies.userId;
  } else {
    userId = NOTLOGGEDINUSERID;
  }

  let userCountries;
  try {
    userCountries = await User.findOne(
      { _id: userId },
      "-_id countries"
    ).populate("countries._id", "slug isSelected");
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!userCountries) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  userCountries = userCountries.countries;

  userCountries = userCountries.filter(item => item._id.isSelected);

  const userSlugs = userCountries.map(item => item._id.slug);

  countriesSummary = countriesSummary.filter(item => {
    const slug = item.Slug;
    return userSlugs.includes(slug);
  });

  countriesSummary = countriesSummary.map(item => {
    const slug = item.Slug;
    const i = userSlugs.indexOf(slug);
    return {
      country: item.Country,
      slug,
      totalConfirmed: item.TotalConfirmed,
      newConfirmed: item.NewConfirmed,
      totalDeaths: item.TotalDeaths,
      totalRecovered: item.TotalRecovered,
      countryId: userCountries[i]._id._id.toString(),
      isSelected: userCountries[i].isSelected
    };
  });

  return res.status(successfulResponse.status).json({ data: countriesSummary });
};

exports.updateSelected = async (req, res) => {
  if (!res.locals.isAuth) {
    return res
      .status(userNotLoggedIn.status)
      .json({ message: userNotLoggedIn.message });
  }

  if (!req.cookies.userId) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const userId = req.cookies.userId;
  const countryId = req.body.countryId;
  const isSelectedNewVal = req.body.isSelectedNewVal;

  let user;

  try {
    user = await User.findOne({ _id: userId }, "countries");
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

  const userCountries = user.countries;

  const i = userCountries.findIndex(item => item._id.toString() === countryId);

  if (i < 0) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  userCountries[i].isSelected = isSelectedNewVal;

  try {
    await user.save();
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(successfulResponse.status).end();
};
