const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const connectAndPrepareDB = require("./utils/connectAndPrepareDB");

module.exports.extendApp = function({ app, ssr }) {
  connectAndPrepareDB();
  app.use(bodyParser.json());
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
};
