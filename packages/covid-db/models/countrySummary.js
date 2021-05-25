const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySummary = new Schema({
  countryName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  totalConfirmed: { type: Number, required: true },
  newConfirmed: { type: Number, required: true },
  totalDeaths: { type: Number, required: true },
  totalRecovered: { type: Number, required: true }
});

module.exports = mongoose.model("CountrySummary", countrySummary);
