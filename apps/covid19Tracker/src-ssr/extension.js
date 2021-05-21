const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authUserRoutes = require("./routes/auth-user");
const authAdminRoutes = require("./routes/auth-admin");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const connectAndPrepareDB = require("./utils/connectAndPrepareDB");

module.exports.extendApp = function({ app, ssr }) {
  connectAndPrepareDB();

  app.use(
    cors({
      origin: "*",
      credentials: true
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth/user", authUserRoutes);
  app.use("/api/auth/admin", authAdminRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes);
};