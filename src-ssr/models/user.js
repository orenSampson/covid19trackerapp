const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  countries: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "AdminCountry" },
      isSelected: { type: Boolean }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
