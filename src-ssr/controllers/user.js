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
    countriesSummary = countriesSummary.Countries;
  }

  let userCountries;

  if (res.locals.isAuth) {
    try {
      userCountries = await User.findOne(
        { _id: req.cookies.userId },
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

    userCountries = userCountries.map(item => {
      return {
        _id: item._id._id,
        slug: item._id.slug,
        isSelected: item.isSelected
      };
    });
  } else {
    try {
      userCountries = await AdminCountry.find({ isSelected: true });
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
    userCountries = userCountries.map(item => {
      return {
        _id: item._id,
        slug: item.slug,
        isSelected: false
      };
    });
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
      countryId: userCountries[i]._id.toString(),
      country: item.Country,
      slug,
      isSelected: userCountries[i].isSelected,
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
