const axios = require("axios");

const AdminCountry = require("covid-db/models/adminCountry");
const { COVID_BASE_URL } = require("covid19api-consts");

module.exports = async () => {
  AdminCountry.estimatedDocumentCount(async function(error, count) {
    if (error) {
      return console.log("error :>> ", error);
    } else {
      if (count === 0) {
        let adminCountries;
        try {
          adminCountries = await axios.get(`${COVID_BASE_URL}/summary`);
          adminCountries = adminCountries.data.Countries;
        } catch (error) {
          return console.log("error :>> ", error);
        }
        if (!adminCountries) {
          return console.log("error retrieving admin countries");
        }

        adminCountries = adminCountries.map(country => {
          return new AdminCountry({
            countryName: country.Country,
            slug: country.Slug,
            isSelected: false
          });
        });

        for (const adminCountry of adminCountries) {
          try {
            await adminCountry.save();
          } catch (error) {
            console.log("error :>> ", error);
            return;
          }
        }
      }
    }
  });

  console.log("checkAdminCollection completed");
};
