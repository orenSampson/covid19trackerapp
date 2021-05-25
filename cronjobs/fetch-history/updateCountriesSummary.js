const axios = require("axios");

const CountrySummary = require("covid-db/models/countrySummary");
const { COVID_BASE_URL } = require("covid19api-consts");

module.exports = async () => {
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

  CountrySummary.estimatedDocumentCount(async function(error, count) {
    if (error) {
      return console.log(error);
    } else {
      if (count === 0) {
        countriesSummary = countriesSummary.map(country => {
          return new CountrySummary(country);
        });

        for (const countrySummary of countriesSummary) {
          try {
            await countrySummary.save();
          } catch (error) {
            return console.log("error :>> ", error);
          }
        }
      } else {
        for (const countrySummary of countriesSummary) {
          const slug = countrySummary.slug;

          let foundCountry;
          try {
            foundCountry = await CountrySummary.find({ slug: slug });
          } catch (error) {
            return console.log("error :>> ", error);
          }

          if (!foundCountry) {
            const countrySummarySave = new CountrySummary(countrySummary);
            try {
              await countrySummarySave.save();
            } catch (error) {
              return console.log("error :>> ", error);
            }
          } else {
            try {
              await CountrySummary.findOneAndUpdate(
                { slug: slug },
                countrySummary
              );
            } catch (error) {
              return console.log("error :>> ", error);
            }
          }
        }
      }
    }
  });

  console.log("updateCountriesSummary completed");
};
