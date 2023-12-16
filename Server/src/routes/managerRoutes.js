const Router = require("express") ;
const managerRoute = Router() ;
const managerController = require("../controllers/managerController") ;

managerRoute.get("/getInventory", managerController.getInventory)
managerRoute.post("/addInventory",  managerController.createInventory) ;
managerRoute.get("/getAllOrders", managerController.allOrders) ;
managerRoute.patch("/updateStatus/:id", managerController.updateStatus)
managerRoute.patch("/editItem/:id", managerController.editItems)
managerRoute.delete("/deleteItem/:id", managerController.deleteItem)

module.exports = managerRoute ;