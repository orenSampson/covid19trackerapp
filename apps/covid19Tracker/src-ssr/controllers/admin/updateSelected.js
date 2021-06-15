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

  const slug = req.body.slug;
  const isSelectedNewVal = req.body.isSelectedNewVal;

  let doc;
  try {
    doc = await AdminCountry.findOneAndUpdate(
      { slug: slug },
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

  res.status(successfulResponse.status).end();
};
