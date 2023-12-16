const Router = require("express");
const customerRoute = Router();
const customerController = require("../controllers/customerController");

customerRoute.get("/getInventory", customerController.getInventory);
customerRoute.post("/postOrder", customerController.postOrder);
customerRoute.post("/card", customerController.itemInCard);
customerRoute.get("/getCard/:id", customerController.getUserCard);
customerRoute.get("/getOrder/:id", customerController.getUserOrders);
module.exports = customerRoute;
