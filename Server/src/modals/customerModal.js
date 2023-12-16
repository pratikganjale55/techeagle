const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const cardSchema = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  quantity: { type: Number, require: true },
  weight: { type: Number, require: true },
  price: { type: Number, require: true },
  userId : { type: String, require: true },
  productId : { type: String, require: true },
});

const cardModal = mongoose.model("usersCards", cardSchema);

module.exports = cardModal;