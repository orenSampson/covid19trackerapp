const logout = require("./auth/logout");
const signup = require("./auth/signup");
const login = require("./auth/login");
const getCountries = require("./get_countries");
const updateSelected = require("./update_selection");
const countryHistory = require("./country_history");
const get_map_info = require("./get_map_info");

exports.logout = logout;

exports.signup = signup;

exports.login = login;

exports.getCountries = getCountries;

exports.updateSelected = updateSelected;

exports.countryHistory = countryHistory;

exports.get_map_info = get_map_info;
