const axios = require("axios");
const moment = require("moment");

const CountriesSummary = require("covid-db/models/countriesSummary");
const CountrySummary = require("covid-db/models/countrySummary");
const AdminCountry = require("covid-db/models/adminCountry");
const { COVID_BASE_URL, BEGINING_DATE } = require("./constants");
const { connectToDB, fillDataFromTo } = require("./utils");

const updateCountriesSummary = async () => {
  let countriesSummary;
  try {
    countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
    countriesSummary = countriesSummary.data.Countries;
  } catch (error) {
    return console.log(error);
  }

  if (!countriesSummary) {
    return console.log("error retrieving countries summary");
  }

  countriesSummary = countriesSummary.map(country => ({
    countryName: country.Country,
    slug: country.Slug,
    totalConfirmed: country.TotalConfirmed,
    newConfirmed: country.NewConfirmed,
    totalDeaths: country.TotalDeaths,
    totalRecovered: country.TotalRecovered
  }));

  const countriesObj = {
    countries: countriesSummary
  };

  CountriesSummary.estimatedDocumentCount(async function(err, count) {
    if (err) {
      console.log(err);
    } else {
      if (count === 0) {
        const countriesSummaryCollection = new CountriesSummary(countriesObj);
        try {
          await countriesSummaryCollection.save();
        } catch (error) {
          console.log("error :>> ", error);
        }
      } else {
        try {
          await CountriesSummary.findOneAndUpdate({}, countriesObj);
        } catch (error) {
          console.log("error :>> ", error);
        }
      }
    }
  });
};

const updateCountrySummary = async () => {
  let adminSelectedCountries;
  try {
    adminSelectedCountries = await AdminCountry.find({
      isSelected: true
    }).lean();
  } catch (error) {
    return console.log("error :>> ", error);
  }
  if (!adminSelectedCountries) {
    return console.log("error :>> ", error);
  }

  let slug,
    from,
    tempTo,
    to,
    countriesAxios,
    countrySummary,
    returnArr,
    index,
    originalCountryDataLength;

  for (const country of adminSelectedCountries) {
    slug = country.slug;

    countrySummary = from = tempTo = to = countriesAxios = returnArr = null;
    try {
      countrySummary = await CountrySummary.findOne({ slug: slug });
    } catch (error) {
      console.log("error :>> ", error);
      continue;
    }

    returnArr = null;
    originalCountryDataLength = 0;
    from = moment(BEGINING_DATE);

    if (countrySummary && countrySummary.countryData.length) {
      const { countryData } = countrySummary;

      originalCountryDataLength = countryData.length;

      index = 0;

      //begining
      to = moment(countryData[index].date);

      if (to.diff(from, "days") >= 1) {
        returnArr = await fillDataFromTo(from, to.subtract(1, "days"), slug);

        if (returnArr && returnArr.length) {
          countryData.splice(index, 0, ...returnArr);
          index += returnArr.length;
        }
      }

      //middle
      while (countryData[index + 1]) {
        from = moment(countryData[index].date);
        index++;
        to = moment(countryData[index].date);

        returnArr = null;

        if (to.diff(from, "days") > 1) {
          returnArr = await fillDataFromTo(
            from.add(1, "days"),
            to.subtract(1, "days"),
            slug
          );

          if (returnArr && returnArr.length) {
            countryData.splice(index, 0, ...returnArr);
            index += returnArr.length;
          }
        }
      }

      //end
      from = moment(countryData[countryData.length - 1].date);
      to = moment().subtract(1, "days");

      if (to.diff(from, "days") >= 1) {
        returnArr = null;
        returnArr = await fillDataFromTo(from.add(1, "days"), to, slug);

        if (returnArr && returnArr.length) {
          countryData.splice(countryData.length, 0, ...returnArr);
        }
      }
    } else {
      to = moment().subtract(1, "days");
      countrySummary = new CountrySummary({ slug: slug, countryData: [] });
      returnArr = await fillDataFromTo(from, to, slug);
      countrySummary.countryData.push(...returnArr);
    }
    if (countrySummary.countryData.length > originalCountryDataLength) {
      try {
        await countrySummary.save();
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }

  console.log("updateCountrySummary completed");
};

exports.app = async () => {
  console.log("running app of app.js");

  await connectToDB();
  //seperate to files
  await updateCountriesSummary();

  await updateCountrySummary();
};
