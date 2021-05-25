const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("covid-db");
const { MONGODB_URI } = require("db-consts");
const authUserRoutes = require("./routes/auth-user");
const authAdminRoutes = require("./routes/auth-admin");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

module.exports.extendApp = async function({ app, ssr }) {
  await connectToDB(MONGODB_URI);

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
