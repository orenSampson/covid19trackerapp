const express = require("express");
const cookieParser = require("cookie-parser");
// const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const connectAndPrepareDB = require("./utils/connectAndPrepareDB");

module.exports.extendApp = function({ app, ssr }) {
  connectAndPrepareDB();

  //   app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/user", userRoutes);
};
