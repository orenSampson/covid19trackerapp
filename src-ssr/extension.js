const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { MONGODB_URI } = require("./constants/mongo");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports.extendApp = function({ app, ssr }) {
  app.use(bodyParser.json());
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
};
