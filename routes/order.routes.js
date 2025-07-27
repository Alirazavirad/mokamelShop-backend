const express = require("express");
const {
  createOrder,
  getUserOrder,
  getAllorders,
  deleteOrder,
} = require("../controllers/order.controller");
const route = express.Router();
route.post("/", createOrder);
route.get("/", getUserOrder);
route.get("/all", getAllorders);
route.delete("/:id",deleteOrder)
module.exports = route;
