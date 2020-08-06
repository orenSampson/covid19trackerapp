const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminCountrySchema = new Schema({
  country: { type: String },
  slug: { type: String, unique: true },
  isSelected: { type: Boolean }
});

module.exports = mongoose.model("AdminCountry", adminCountrySchema);
