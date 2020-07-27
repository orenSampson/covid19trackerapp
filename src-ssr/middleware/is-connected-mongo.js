const mongoose = require("mongoose");

const { MONGODB_URI } = require("../constants/mongo");

module.exports = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: "MongoDB connection failed" });
  }
  next();
};
