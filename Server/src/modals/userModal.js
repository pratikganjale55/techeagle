const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
});

const userModal = mongoose.model("users", userSchema);

module.exports = userModal;
