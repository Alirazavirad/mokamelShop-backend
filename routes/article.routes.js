const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createArticle,
  getArticles,
  deleteArticle,
} = require("../controllers/article.controller");
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

route.post("/", upload.single("img"), createArticle);
route.get("/", getArticles);
route.delete("/:id", deleteArticle);
module.exports = route;
