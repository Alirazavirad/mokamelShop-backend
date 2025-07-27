const express = require("express");
const {
  Signup,
  Singin,
  getUserInfoByid,
  getUsers,
  deleteUser,
  editOne,
  banOne,
  createCart,
  getUserCart,
  deleteOneProduct,
  editUser,
} = require("../controllers/user.controller");
const route = express.Router();
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

route.post("/signup", Signup);
route.post("/signin", Singin);
route.get("/", getUserInfoByid);
route.get("/all", getUsers);
route.delete("/:id", deleteUser);
route.patch("/:id", editOne);
route.patch("/ban/:id", banOne);
route.post("/cart", createCart);
route.get("/cart", getUserCart);
route.delete("/cart/:id", deleteOneProduct);
route.patch("/", upload.single("img"), editUser);
module.exports = route;
