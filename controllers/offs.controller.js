const offsModel = require("../models/offs.model");
const createOff = async (req, res) => {
  try {
    const { code, percent, maxUse } = req.body;
    const offslength = await offsModel.find().countDocuments();
    const off = await offsModel.create({
      code,
      percent,
      maxUse,
      id: offslength + 1,
    });
    return res.status(200).json({
      message: "off created successfully",
      off,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteoff = async (req, res) => {
  try {
    const id = req.params.id;
    await offsModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "off deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getOffs = async (req, res) => {
  try {
    const offs = await offsModel.find();
    console.log({offs});
    
    return res.status(200).json({
      message: "offs fetched successfully",
      offs,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
  createOff,
  deleteoff,
  getOffs,
};
