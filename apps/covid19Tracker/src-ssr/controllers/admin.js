const AdminCountry = require("covid-db/models/adminCountry");
const {
  serverError,
  notAuthenticated,
  successfulResponse
} = require("../constants/responses");

exports.getCountries = async (req, res, next) => {
  if (!res.locals.isAdmin) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  let countriesArr;

  try {
    countriesArr = await AdminCountry.find().sort({ country: 1 });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!countriesArr) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const newCountriesArr = countriesArr.map(item => {
    return {
      _id: item._id,
      country: item.country,
      isSelected: item.isSelected
    };
  });

  res.status(successfulResponse.status).json({ data: newCountriesArr });
};

exports.updateSelected = async (req, res, next) => {
  if (!res.locals.isAdmin) {
    return res
      .status(notAuthenticated.status)
      .json({ message: notAuthenticated.message });
  }

  const countryId = req.body.id;
  const isSelectedNewVal = req.body.isSelectedNewVal;

  let doc;
  try {
    doc = await AdminCountry.findOneAndUpdate(
      { _id: countryId },
      { isSelected: isSelectedNewVal }
    );
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (!doc) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const slug = doc.slug;
  console.log("slug :>> ", slug);

  if (isSelected) {
  }

  res.status(successfulResponse.status).end();
};
