const mongoose = require("mongoose");
const axios = require("axios");

const { MONGODB_URI } = require("../constants/mongo");
const AdminCountry = require("../models/adminCountry");

module.exports = async () => {
  //   let numDocs = 0;
  //   let countriesArr;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (error) {
    return console.log(error);
  }

  //   try {
  //     numDocs = await AdminCountry.find().countDocuments();
  //     if (numDocs !== 0) {
  //       return;
  //     } else {

  //     }
  //   } catch (err) {
  //     return console.log(err);
  //   }

  //   try {
  //     countriesArr = await axios.get("https://api.covid19api.com/countries");
  //     if (!countriesArr) {
  //       return;
  //     }
  //   } catch (err) {
  //     return console.log(err);
  //   }

  //   countriesArr = countriesArr.data;

  //   for (const element of countriesArr) {
  //     try {
  //       const adminCountry = new AdminCountry({
  //         country: element.Country,
  //         slug: element.Slug,
  //         isSelected: false
  //       });
  //       await adminCountry.save();
  //     } catch (err) {
  //       return console.log(err);
  //     }
  //   }

  // https://www.geeksforgeeks.org/mongoose-insertmany-function/
};
