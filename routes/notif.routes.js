const express = require("express");
const {
  createNotif,
  getNotifs,
  deleteNotif,
} = require("../controllers/notif.controller");
const route = express.Router();

route.post("/", createNotif);
route.get("/", getNotifs);
route.delete("/:id", deleteNotif);
module.exports = route;
