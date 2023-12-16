const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const inventorySchema = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  quantity: { type: Number, require: true },
  weight: { type: Number, require: true },
  price: { type: Number, require: true },
});

const inventoryModal = mongoose.model("inventory", inventorySchema);

module.exports = inventoryModal;
