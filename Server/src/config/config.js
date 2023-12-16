const mongoose = require("mongoose");

const url = "mongodb+srv://pratikganjale55:techeagle@cluster0.ppubgma.mongodb.net/";
const connection = mongoose
  .connect(url)
  .then(() => console.log("Database successfully connect"))
  .catch((err) => console.log("error", err));

module.exports = connection;
