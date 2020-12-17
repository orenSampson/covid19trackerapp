const express = require("express");

const userController = require("../controllers/user");
const isAuthCountries = require("../middleware/is-auth-user-countries");
const isAuthUpdateSelected = require("../middleware/is-auth-user-updateSelected");

const router = express.Router();

router.get("/getcountries", isAuthCountries, userController.getCountries);

router.post(
  "/updateselected",
  isAuthUpdateSelected,
  userController.updateSelected
);

module.exports = router;
