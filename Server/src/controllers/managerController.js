const inventoryModal = require("../modals/managerModal");
const ordersModal = require("../modals/ordersModal");
const jwt = require("jsonwebtoken");
const getInventory = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const inventoryData = await inventoryModal.find({});
    console.log(inventoryData);
    if (inventoryData.length <= 0) {
      return res.status(201).send({ message: "no data yet" });
    }
    return res.status(201).send(inventoryData);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const createInventory = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { role } = jwt.verify(token, "test123");
    if (role !== "manager") {
      return res.status(403).send({ message: "Access denied" });
    }
    const { name, description, quantity, weight, price } = req.body;
    console.log(req.body);
    if (!name || !description || !quantity || !weight || !price) {
      return res.send({ message: "fill all details" });
    }
    const addInventory = await inventoryModal(req.body);
    const save = await addInventory.save();
    if (save) {
      return res.status(200).send({ message: "Inventory save successfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};

const allOrders = async (req, res) => {
  try {
    console.log("getcalll");
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { role } = jwt.verify(token, "test123");
    if (role !== "manager") {
      return res.status(403).send({ message: "Access denied" });
    }
    const allOrders = await ordersModal.find({});
    if (allOrders.length <= 0) {
      return res.status(201).send({ message: "no data yet" });
    }
    return res.status(201).send(allOrders);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};

const updateStatus = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { role } = jwt.verify(token, "test123");
    if (role !== "manager") {
      return res.status(403).send({ message: "Access denied" });
    }
    const { id } = req.params;
    const { status } = req.body;
    console.log(id);
    const userCards = await ordersModal.findOneAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { new: true }
    );
    if (!userCards) {
      return res
        .status(404)
        .json({ message: "No data found for the given model ID" });
    }

    return res.status(200).json(userCards);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};

const editItems = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { role } = jwt.verify(token, "test123");
    if (role !== "manager") {
      return res.status(403).send({ message: "Access denied" });
    }
    const { id } = req.params;

    console.log(id);
    const editData = await inventoryModal.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!userCards) {
      return res
        .status(404)
        .json({ message: "No data found for the given model ID" });
    }

    return res.status(200).json(editData);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error", error });
  }
};
const deleteItem = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const {role} = jwt.verify(token, "test123");
    console.log(role, token)
    if (role !== "manager") {
      return res.status(403).send({ message: "Access denied" });
    }
    const { id } = req.params;

    const item = await inventoryModal.deleteOne({_id : id});
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createInventory,
  getInventory,
  allOrders,
  updateStatus,
  editItems,
  deleteItem,
};
