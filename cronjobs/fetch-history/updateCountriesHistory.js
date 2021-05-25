const moment = require("moment");

const AdminCountry = require("covid-db/models/adminCountry");
const CountryHistory = require("covid-db/models/countryHistory");
const { fillDataFromTo } = require("./utils");
const { BEGINING_DATE } = require("./constants");

module.exports = async () => {
  let adminSelectedCountries;
  try {
    adminSelectedCountries = await AdminCountry.find({
      isSelected: true
    }).lean();
  } catch (error) {
    return console.log("error :>> ", error);
  }
  if (!adminSelectedCountries) {
    return console.log("error retrieving admin countries");
  }

  let slug,
    from,
    to,
    countryHistory,
    returnCountryHistoryArr,
    index,
    originalCountryDataLength;

  for (const adminSelectedCountry of adminSelectedCountries) {
    slug = adminSelectedCountry.slug;

    console.log(`start country ${slug}`);

    countryHistory = from = to = returnCountryHistoryArr = null;
    try {
      countryHistory = await CountryHistory.findOne({ slug: slug });
    } catch (error) {
      console.log("error :>> ", error);
      continue;
    }

    originalCountryDataLength = 0;
    from = moment(BEGINING_DATE);

    if (countryHistory && countryHistory.countryData.length) {
      const { countryData: countryHistoryData } = countryHistory;

      originalCountryDataLength = countryHistoryData.length;

      index = 0;

      //begining
      to = moment(countryHistoryData[index].date);
      if (to.diff(from, "days") >= 1) {
        returnCountryHistoryArr = await fillDataFromTo(
          from,
          to.subtract(1, "days"),
          slug
        );

        if (returnCountryHistoryArr && returnCountryHistoryArr.length) {
          countryHistoryData.splice(index, 0, ...returnCountryHistoryArr);
          index += returnCountryHistoryArr.length;
        }
      }

      //middle
      while (countryHistoryData[index + 1]) {
        from = moment(countryHistoryData[index].date);
        index++;
        to = moment(countryHistoryData[index].date);

        returnCountryHistoryArr = null;
        if (to.diff(from, "days") > 1) {
          returnCountryHistoryArr = await fillDataFromTo(
            from.add(1, "days"),
            to.subtract(1, "days"),
            slug
          );

          if (returnCountryHistoryArr && returnCountryHistoryArr.length) {
            countryHistoryData.splice(index, 0, ...returnCountryHistoryArr);
            index += returnCountryHistoryArr.length;
          }
        }
      }

      //end
      from = moment(countryHistoryData[countryHistoryData.length - 1].date);
      to = moment().subtract(1, "days");
      if (to.diff(from, "days") >= 1) {
        returnCountryHistoryArr = null;
        returnCountryHistoryArr = await fillDataFromTo(
          from.add(1, "days"),
          to,
          slug
        );

        if (returnCountryHistoryArr && returnCountryHistoryArr.length) {
          countryHistoryData.splice(
            countryHistoryData.length,
            0,
            ...returnCountryHistoryArr
          );
        }
      }
    } else {
      to = moment().subtract(1, "days");
      countryHistory = new CountryHistory({ slug: slug, countryData: [] });
      returnCountryHistoryArr = await fillDataFromTo(from, to, slug);
      countryHistory.countryData.push(...returnCountryHistoryArr);
    }

    if (countryHistory.countryData.length > originalCountryDataLength) {
      try {
        await countryHistory.save();
      } catch (error) {
        return console.log("error :>> ", error);
      }
    }

    console.log(`end country ${slug}`);
  }

  console.log("updateCountriesHistory completed");
};
