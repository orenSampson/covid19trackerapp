const express = require("express");

const authAdminController = require("../controllers/auth-admin");

const router = express.Router();

router.get("/logout", authAdminController.logout);

router.post("/login", authAdminController.login);

module.exports = router;
