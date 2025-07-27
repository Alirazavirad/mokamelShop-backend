const OrderModel = require("../models/order.model");
const UserModel = require("../models/User.model");

const createOrder = async (req, res) => {
  try {
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const user = await UserModel.findOne({ token });
    const orderslength = await OrderModel.find().countDocuments();
    const order = await OrderModel.create({
      id: orderslength + 1,
      user: user._id,
      products: user.cart,
    });
    user.cart = [];
    user.save();
    return res.status(200).json({
      message: "order created successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getUserOrder = async (req, res) => {
  try {
    const header = req.get("Authorization");
    const token = header.split(" ")[1];
    const user = await UserModel.findOne({ token });
    const order = await OrderModel.findOne({ user: user._id }).populate(
      "products.product"
    );
    return res.status(200).json({
      message: "orders fetched successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getAllorders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("products.product user");
    return res.status(200).json({
      message: "orders fetched successfully",
      orders,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "order deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
  createOrder,
  getUserOrder,
  getAllorders,
  deleteOrder
};
