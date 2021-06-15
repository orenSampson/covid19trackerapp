const User = require("covid-db/models/user");
const {
  serverError,
  successfulResponse,
  userNotLoggedIn
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  if (!res.locals.isAuth) {
    return res
      .status(userNotLoggedIn.status)
      .json({ message: userNotLoggedIn.message });
  }

  const userId = res.locals.payload.sub;
  const countrySlug = req.body.slug;
  const selectedNewVal = req.body.selectedNewVal;

  let user;

  try {
    user = await User.findOne({ _id: userId }, "selectedCountries");
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
  if (!user) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  if (selectedNewVal) {
    user.selectedCountries.push(countrySlug);
  } else {
    user.selectedCountries = user.selectedCountries.filter(
      selectedCountrySlug => selectedCountrySlug !== countrySlug
    );
  }

  try {
    await user.save();
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  res.status(successfulResponse.status).end();
};
