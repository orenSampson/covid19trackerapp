const connectToDB = require("covid-db");
const checkAdminCollection = require("./checkAdminCollection");
const updateCountriesSummary = require("./updateCountriesSummary");
const updateCountriesHistory = require("./updateCountriesHistory");
const { MONGODB_URI } = require("db-consts");

const fetch_history = async () => {
  await connectToDB(MONGODB_URI);

  await checkAdminCollection();

  await updateCountriesSummary();

  await updateCountriesHistory();
};

fetch_history();
