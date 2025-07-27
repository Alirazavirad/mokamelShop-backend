const NotifModel = require("../models/notif.model");

const createNotif = async (req, res) => {
  try {
    const { message, title, phone, email, name } = req.body;
    const notifslength = await NotifModel.find().countDocuments();
    await NotifModel.create({
      message,
      title,
      phone,
      email,
      name,
      id: notifslength + 1,
    });
    return res.status(200).json({
      message: "notif created",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getNotifs = async (req, res) => {
  try {
    const notifs = await NotifModel.find();
    return res
      .status(200)
      .json({ message: "notifs fetched successfully", notifs });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteNotif = async (req, res) => {
  try {
    const id = req.params.id;
    const notif = await NotifModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      message: "notif deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
  createNotif,
  getNotifs,
  deleteNotif,
};
