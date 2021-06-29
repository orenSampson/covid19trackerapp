const fsPromises = require("fs").promises;
const path = require("path");

const {
  serverError,
  successfulResponse
} = require("../../constants/responses");

module.exports = async (req, res, next) => {
  let countriesData;
  try {
    const filePath = path.join(__dirname, "data.json");
    countriesData = await fsPromises.readFile(filePath);
    countriesData = JSON.parse(countriesData.toString());
  } catch (error) {
    return res
      .status(serverError.status)
      .json({ message: serverError.message });
  }

  return res.status(successfulResponse.status).json({ data: countriesData });
};
