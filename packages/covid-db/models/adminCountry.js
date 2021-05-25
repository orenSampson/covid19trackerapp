const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminCountrySchema = new Schema({
  countryName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isSelected: { type: Boolean, required: true }
});

module.exports = mongoose.model("AdminCountry", adminCountrySchema);
