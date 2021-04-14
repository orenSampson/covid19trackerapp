const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
// const mongoose = require("mongoose");

const User = require("../models/user");
const AdminCountry = require("../models/adminCountry");
const { COVID_BASE_URL } = require("../constants/covid19");
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

exports.getCountries = async (req, res) => {
  if (res.locals.isAuth && !req.cookies.userId) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  let countriesSummary;
  let isCovid19APISuccess = false;

  try {
    countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
    countriesSummary = countriesSummary.data.Countries;

    isCovid19APISuccess = true;
  } catch (error) {}

  if (!countriesSummary) {
  }

  if (!isCovid19APISuccess) {
    let rawdata;
    const certPath = path.join(__dirname, "../constants/countriesData.json");
    try {
      rawdata = await fs.readFile(certPath);
    } catch (error) {
      return res
        .status(serverError.status)
        .json({ message: serverError.message });
    }

    countriesSummary = JSON.parse(rawdata);
  }

  let userCountries;

  try {
    const [userSelectedCountries, allCountries] = await Promise.all([
      res.locals.isAuth
        ? getUserCountries(req.cookies.userId)
        : Promise.resolve([]),
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
  countriesSummary = countriesSummary.filter(({ Slug }) => {
    return userSlugsMap.has(Slug);
  });

  countriesSummary = countriesSummary.map(item => {
    const country = userSlugsMap.get(item.Slug);
    return {
      countryId: country._id.toString(),
      country: item.Country,
      slug: item.Slug,
      isSelected: country.isSelected,
      totalConfirmed: item.TotalConfirmed,
      newConfirmed: item.NewConfirmed,
      totalDeaths: item.TotalDeaths,
      totalRecovered: item.TotalRecovered
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
      selectedCountriesId => selectedCountriesId.toString() !== countryId
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
