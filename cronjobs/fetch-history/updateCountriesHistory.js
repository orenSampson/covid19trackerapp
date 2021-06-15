const moment = require("moment");

const CountrySummary = require("covid-db/models/countrySummary");
const CountryHistory = require("covid-db/models/countryHistory");
const {
  fillDataFromTo,
  fillDataBeginingToYesterday
} = require("fetch-history-utils");
const { BEGINING_DATE } = require("covid19api-consts");

module.exports = async () => {
  let countriesSummary;
  try {
    countriesSummary = await CountrySummary.find({}).lean();
  } catch (error) {
    return console.log("error :>> ", error);
  }
  if (!countriesSummary) {
    return console.log("error retrieving CountrySummary countries");
  }

  let slug,
    from,
    to,
    countryHistory,
    returnCountryHistoryArr,
    index,
    originalCountryDataLength;

  for (const countrySummary of countriesSummary) {
    slug = countrySummary.slug;

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
      countryHistory = new CountryHistory({ slug: slug, countryData: [] });
      returnCountryHistoryArr = await fillDataBeginingToYesterday(slug);
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
