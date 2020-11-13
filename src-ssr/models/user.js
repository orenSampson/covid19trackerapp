const mongoose = require("mongoose");
// const { schema } = require("./adminCountry");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  countries: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'AdminCountry' },
    //   slug: { type: String },
      isSelected: { type: Boolean }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
