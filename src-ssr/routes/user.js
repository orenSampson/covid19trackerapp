const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth-user");

const router = express.Router();

router.get("/getcountries", isAuth, userController.getCountries);

router.post(
  "/updateselected",
  isAuth,
  userController.updateSelected
);

module.exports = router;
