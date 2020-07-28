const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { MONGODB_URI } = require("./constants/mongo");
const authRoutes = require("./routes/auth");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

module.exports.extendApp = function({ app, ssr }) {
  app.use(bodyParser.json());
  app.use("/auth", authRoutes);
};
