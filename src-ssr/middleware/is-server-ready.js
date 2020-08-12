const { serverError } = require("../constants/responses");
const AdminCountry = require("../models/adminCountry");

module.exports = async (req, res, next) => {
  let numDocs = 0;

  try {
    numDocs = await AdminCountry.find().countDocuments();
  } catch (err) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (numDocs === 0) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  next();
};
