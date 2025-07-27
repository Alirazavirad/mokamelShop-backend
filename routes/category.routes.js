const express = require("express");
const route = express.Router();
const { createCat, getCats, deleteCat } = require("../controllers/category.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("uploads/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
route.post("/", upload.single("img"), createCat);
route.get("/",getCats)
route.delete("/:id",deleteCat)
module.exports = route;
