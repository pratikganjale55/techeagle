const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const orderSchema = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  quantity: { type: Number, require: true },
  weight: { type: Number, require: true },
  price: { type: Number, require: true },
  userId: { type: String, require: true },
  status: { type: Number, require: true, default: 0 },
});

const orderModal = mongoose.model("orders", orderSchema);

module.exports = orderModal;
