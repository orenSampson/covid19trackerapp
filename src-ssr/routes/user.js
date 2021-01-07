const express = require("express");

const userController = require("../controllers/user");
const { getCountries, updateSelected } = require("../middleware/is-auth-user");

const router = express.Router();

router.get("/getcountries", getCountries, userController.getCountries);

router.post("/updateselected", updateSelected, userController.updateSelected);

module.exports = router;
