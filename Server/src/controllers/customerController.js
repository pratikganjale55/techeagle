const customerModal = require("../modals/customerModal");
const inventryModal = require("../modals/managerModal");
const orderModal = require("../modals/ordersModal");

const getInventory = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const inventory = await inventryModal.find({});
    if (!inventory) {
      return res
        .status(404)
        .json({ message: "No inventory found for the given model ID" });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const itemInCard = async (req, res) => {
  try {
    console.log("calling.....");
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { name, description, quantity, weight, price, userId } = req.body;
    console.log("card", req.body);

    const addInventory = await customerModal(req.body);
    const save = await addInventory.save();
    if (save) {
      return res.status(200).send({ message: "Inventory save successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getUserCard = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { id } = req.params;
    console.log(id);
    const userCards = await customerModal.find({ userId: id });
    console.log(userCards);
    if (!userCards) {
      return res
        .status(404)
        .json({ message: "No data found for the given model ID" });
    }

    return res.status(200).json(userCards);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const postOrder = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const orders = await orderModal(req.body);
    const save = await orders.save();
    if (save) {
      return res.status(200).send({ message: "Order place successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const { id } = req.params;
    console.log(id);
    const userOrders = await orderModal.find({ userId: id });

    console.log(userOrders);
    return res.status(200).json(userOrders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = {
  getUserOrders,
  getInventory,
  postOrder,
  itemInCard,
  getUserCard,
};
