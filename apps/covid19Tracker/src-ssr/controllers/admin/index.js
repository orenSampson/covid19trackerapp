const login = require("./login");
const getCountries = require("./getCountries");
const updateSelected = require("./getCountries");
const { ADMIN_TOKEN_NAME } = require("../../constants/admin");
const { successfulResponse } = require("../../constants/responses");

exports.logout = (req, res, next) => {
  res.clearCookie(ADMIN_TOKEN_NAME);

  res.status(successfulResponse.status).end();
};

exports.login = login;

exports.getCountries = getCountries;

exports.updateSelected = updateSelected;

// exports.updateSelected = async (req, res, next) => {
//   if (!res.locals.isAdmin) {
//     return res
//       .status(notAuthenticated.status)
//       .json({ message: notAuthenticated.message });
//   }

//   const countryId = req.body.id;
//   const isSelectedNewVal = req.body.isSelectedNewVal;

//   let doc;
//   try {
//     doc = await AdminCountry.findOneAndUpdate(
//       { _id: countryId },
//       { isSelected: isSelectedNewVal }
//     );
//   } catch (error) {
//     return res
//       .status(serverError.status)
//       .json({ message: serverError.message });
//   }

//   if (!doc) {
//     return res
//       .status(serverError.status)
//       .json({ message: serverError.message });
//   }

//   const slug = doc.slug;
//   console.log("slug :>> ", slug);

//   if (isSelected) {
//   }

//   res.status(successfulResponse.status).end();
// };
