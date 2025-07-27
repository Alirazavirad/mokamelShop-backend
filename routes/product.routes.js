const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createProduct,
  getProducts,
  deleteProduct,
  editById,
  getBycats,
} = require("../controllers/product.controller");
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
route.post("/", upload.single("img"), createProduct);
route.get("/", getProducts);
route.delete("/:id", deleteProduct);
route.patch("/:id",editById)
route.get("/cat/:id",getBycats)
module.exports = route;
