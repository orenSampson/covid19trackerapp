const jwt = require("jsonwebtoken");
const axios = require("axios");

const AdminCountry = require("../models/adminCountry");
const { COVID_BASE_URL } = require("../constants/covid19");
const { ACCESS_TOKEN_SECRET } = require("../constants/auth");
const { serverError, successfulResponse } = require("../constants/responses");

module.exports = async (req, res, next) => {
  const token = req.cookies.user_access_token;

  if (isAuth(token)) {
    return next();
  }

  let countriesSummary;

  try {
    countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
  } catch (err) {
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

  let adminCountries;
  try {
    adminCountries = await AdminCountry.find();
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!adminCountries) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  adminCountries = adminCountries.filter(item => item.isSelected);

  const adminSlugs = adminCountries.map(item => item.slug);

  countriesSummary = countriesSummary.filter(item => {
    const slug = item.Slug;
    return adminSlugs.includes(slug);
  });

  countriesSummary = countriesSummary.map(item => {
    const slug = item.Slug;
    const i = adminSlugs.indexOf(slug);
    return {
      Country: item.Country,
      TotalConfirmed: item.TotalConfirmed,
      NewConfirmed: item.NewConfirmed,
      TotalDeaths: item.TotalDeaths,
      TotalRecovered: item.TotalRecovered,
      countryId: adminCountries[i]._id.toString(),
      isSelected: false
    };
  });

  res.status(successfulResponse.status).json({ data: countriesSummary });
};

const isAuth = token => {
  if (!token) {
    return false;
  }

  let decodedToken = null;

  try {
    decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    return false;
  }

  if (!decodedToken) {
    return false;
  }

  return true;
};
