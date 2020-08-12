module.exports = Object.freeze({
  successfulResponse: { status: 200 },
  serverError: {
    status: 500,
    message: "Server Error. Please try again later."
  },
  userCreated: {
    status: 201,
    message: "User created!"
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
  signinSuccessful: {
    status: 200,
    message: "Successful sign in"
  }
});
