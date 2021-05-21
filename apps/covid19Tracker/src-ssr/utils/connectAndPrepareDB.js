const { MONGODB_URI } = require("../constants/mongo");

module.exports = () => require("covid-db")(MONGODB_URI);
