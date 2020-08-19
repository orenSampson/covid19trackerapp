const axios = require("axios");

const User = require("../models/user");
const { COVID_BASE_URL } = require("../constants/covid19");
const { serverError, successfulResponse } = require("../constants/responses");

exports.getCountries = async (req, res, next) => {
  const userIdHeader = req.get("userid");
  if (!userIdHeader) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let countriesSummary;

  try {
    countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
    countriesSummary = countriesSummary.data.Countries;
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let userCountries;
  try {
    userCountries = await User.find({ _id: userIdHeader }, "countries");
    userCountries = userCountries[0].countries;
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const userSlugs = userCountries.map(item => item.slug);

  countriesSummary = countriesSummary.filter(item => {
    const slug = item.Slug;
    return userSlugs.includes(slug);
  });

  countriesSummary = countriesSummary.map(item => {
    const slug = item.Slug;
    const i = userSlugs.indexOf(slug);
    return {
      Country: item.Country,
      TotalConfirmed: item.TotalConfirmed,
      NewConfirmed: item.NewConfirmed,
      TotalDeaths: item.TotalDeaths,
      TotalRecovered: item.TotalRecovered,
      countryId: userCountries[i]._id.toString(),
      isSelected: userCountries[i].isSelected
    };
  });

  res.status(successfulResponse.status).json({ data: countriesSummary });
};
