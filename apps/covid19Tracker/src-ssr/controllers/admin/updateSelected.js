const AdminCountry = require("covid-db/models/adminCountry");
const {
  serverError,
  notAuthenticated,
  successfulResponse
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
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

  // const slug = doc.slug;
  // console.log("slug :>> ", slug);

  // if (isSelected) {
  // }

  res.status(successfulResponse.status).end();
};
