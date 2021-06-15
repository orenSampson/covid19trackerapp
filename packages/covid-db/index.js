const mongoose = require("mongoose");

module.exports = async uri => {
  try {
    return await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (error) {
    return console.log(error);
  }
};
