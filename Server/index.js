const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const connection = require("./src/config/config");
const customerRoute = require("./src/routes/customerRoutes");
const managerRoute = require("./src/routes/managerRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userRoutes);
app.use("/customer", customerRoute);
app.use("/manager", managerRoute);
app.get("/", (req, res) => {
  res.send("Welcome our website");
});
app.listen("5000", () => {
  console.log("Server start at 5000");
});
