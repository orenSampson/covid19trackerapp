const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("covid-db/models/user");
const { serverError, userCreated } = require("../../../constants/responses");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  let hashedPassWord;
  try {
    hashedPassWord = await bcrypt.hash(password, 12);
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  const user = new User({
    email: email,
    password: hashedPassWord,
    name: name,
    countries: []
  });

  try {
    const result = await user.save();
    return res
      .status(userCreated.status)
      .json({ message: userCreated.message, userId: result._id });
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }
};
