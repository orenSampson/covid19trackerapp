const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  console.log("Email", email);
  console.log("Name", name);
  console.log("Password", password);

  let hashedPassWord = null;

  try {
    hashedPassWord = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "failed generating hashed password" });
  }
  const user = new User({
    email,
    password: hashedPassWord,
    name
  });

  try {
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created on MongoDB!", userId: result._id });
  } catch (err) {
    res.status(500).json({ message: "failed creating User on MongoDB" });
  }
};
