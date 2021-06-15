const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  selectedCountries: [{ type: String }] //contain slugs of countries
});

module.exports = mongoose.model("User", userSchema);
