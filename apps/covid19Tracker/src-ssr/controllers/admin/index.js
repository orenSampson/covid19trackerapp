const login = require("./auth/login");
const logout = require("./auth/logout");
const getCountries = require("./getCountries");
const updateSelected = require("./updateSelected");

exports.login = login;

exports.logout = logout;

exports.getCountries = getCountries;

exports.updateSelected = updateSelected;
