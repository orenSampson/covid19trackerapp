const express = require("express");

const adminController = require("../controllers/admin");
const isAuthAdmin = require("../middleware/is-auth-admin");

const router = express.Router();

router.get("/logout", adminController.logout);

router.post("/signin", adminController.signin);

router.get("/getcountries", isAuthAdmin, adminController.getCountries);

router.post("/updateselected", isAuthAdmin, adminController.updateSelected);

module.exports = router;
