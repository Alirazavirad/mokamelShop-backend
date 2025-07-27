const express = require("express");
const route = express.Router();
const {
  createOff,
  getOffs,
  deleteoff,
} = require("../controllers/offs.controller");
route.post("/", createOff);
route.get("/", getOffs);
route.delete("/:id", deleteoff);

module.exports = route;
