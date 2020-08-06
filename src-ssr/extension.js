const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { MONGODB_URI } = require("./constants/mongo");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const AdminCountry = require("./models/adminCountry");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// const mongooseFunc = async () => {
//   console.log("try connection");
//   try {
//     console.log("try connection1");
//     await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//     const adminCountry = new AdminCountry({
//       country: "Oren",
//       slug: "oren",
//       isSelected: true
//     });
//     await adminCountry.save();
//     console.log("connection OK");
//   } catch (err) {
//     console.log(err);
//   }
// };

// mongooseFunc();

module.exports.extendApp = function({ app, ssr }) {
  //   mongooseFunc();
  app.use(bodyParser.json());
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
};
