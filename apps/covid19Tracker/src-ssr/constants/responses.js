const { PASSWORD_MIN_LENGTH } = require("./auth");

module.exports = Object.freeze({
  successfulResponse: { status: 200 },
  loginSuccessful: {
    status: 200,
    message: "Successful login"
  },
  userCreated: {
    status: 201,
    message: "User created!"
  },
  serverError: {
    status: 500,
    message: "Server Error. Please try again later."
  },
  userNotLoggedIn: {
    status: 401,
    message: "Must log in inorder to perform this operation"
  },
  userNotFound: {
    status: 401,
    message: "A user with this email could not be found"
  },
  wrongPassword: {
    status: 401,
    message: "Wrong password!"
  },
  notAuthenticated: {
    status: 401,
    message: "Not authenticated."
  },
  emptyNameMsg: "Name must not be empty",
  notValidEmailMsg: "Please enter a valid email",
  emailInUseMsg: "E-mail already in use. Please choose another email",
  passwordTooShortMsg: `Password too short. Should be at least ${PASSWORD_MIN_LENGTH} characters`
});
