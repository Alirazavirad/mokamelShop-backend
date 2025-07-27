const { hash, compare } = require("bcryptjs");
const crypto = require("crypto");
const UserModel = require("../models/User.model");
const BanModel = require("../models/ban.model");
const ProductModel = require("../models/product.model");
const Signup = async (req, res) => {
  try {
    const body = req.body;
    const { username, name, password, email, phone } = body;
    const hashedpass = await hash(body.password, 12);
    const token = await crypto.randomBytes(32).toString("hex");
    const isUser = await UserModel.findOne({
      $or: [{ username, phone }],
    });
    if (isUser) {
      return res.status(400).json({
        message: "This phone or username is taken",
      });
    }
    const isBan = await BanModel.findOne({ phone });
    if (isBan) {
      return res.status(400).json({
        message: "user is banned",
      });
    }
    const usersLength = await UserModel.find().countDocuments();
    const user = await UserModel.create({
      username,
      name,
      phone,
      email,
      id: usersLength + 1,
      token,
      isban: false,
      password: hashedpass,
      role: usersLength == 0 ? "ADMIN" : "USER",
    });
    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const Singin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const isBan = await BanModel.findOne({ phone });
    if (isBan) {
      return res.status(400).json({
        message: "user is banned",
      });
    }

    const isUser = await UserModel.findOne({ phone });
    if (isUser) {
      const isValidPass = await compare(password, isUser.password);
      if (isValidPass) {
        const token = await crypto.randomBytes(32).toString("hex");
        isUser.token = token;
        isUser.save();
        return res.status(200).json({
          message: "user logged in successfully",
          user: isUser,
        });
      } else {
        return res.status(400).json({
          message: "password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getUserInfoByid = async (req, res) => {
  const header = req.get("Authorization");
  const token = header.split(" ")[1];
  const user = await UserModel.findOne({ token }).select(
    "-password -token -_id -_v"
  )
  return res.status(200).json({
    message: "user fetched successfully",
    user,
  });
};
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      message: "users fetched successfully",
      users: users.filter((item) => item.isban == false),
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const editOne = async (req, res) => {
  try {
    const id = req.params.id;
    const { phone } = req.body;
    await UserModel.findOneAndUpdate(
      { id },
      {
        $set: {
          phone,
        },
      }
    );
    return res.status(200).json({
      message: "user edited successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const banOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOneAndUpdate(
      { id },
      {
        $set: {
          isban: true,
        },
      },
      { new: true }
    );
    await BanModel.create({ phone: user.phone });
    return res.status(200).json({
      message: "user banned successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const createCart = async (req, res) => {
  try {
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const user = await UserModel.findOne({ token }).populate("cart.product");
    const { productid, count } = req.body;
    const Product = await ProductModel.findOne({ id: productid });
    const isExist = user.cart.filter((item) => item.product.id == Product.id);

    if (isExist.length == 0) {
      user.cart.push({ count, product: Product._id });
      user.save();
    } else {
      user.cart.filter((item) => item.product.id == Product.id)[0].count =
        user.cart.filter((item) => item.product.id == Product.id)[0].count +
        count;
      user.save();
    }
    return res.status(200).json({
      message: "successfully added",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getUserCart = async (req, res) => {
  try {
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const user = await UserModel.findOne({ token }).populate("cart.product");
    return res.status(200).json({
      message: "cart fetched successfully",
      cart: user.cart,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const user = await UserModel.findOne({ token }).populate("cart.product");
    user.cart = user.cart.filter((item) => item.product.id != id);
    user.save();
    return res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const editUser = async (req, res) => {
  try {
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const { name, email, phone, username } = req.body;
    const filepath = req.file.path.replace(/\\/g, "/");
    const user = await UserModel.findOne({ token });
    if (name != undefined) {
      user.name = name;
    }
    if (username != undefined) {
      user.username = username;
    }
    if (phone != undefined) {
      user.phone = phone;
    }
    if (name != undefined) {
      user.email = email;
    }
    if (filepath != undefined) {
      user.img = filepath;
    }
    user.save();
    return res.status(200).json({
      message: "user updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
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
  editUser
};
