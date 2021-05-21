module.exports = Object.freeze({
  successfulResponse: { status: 200 },
  signinSuccessful: {
    status: 200,
    message: "Successful sign in"
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
  }
});
