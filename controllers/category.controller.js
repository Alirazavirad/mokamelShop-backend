const CategoryModel = require("../models/category.model");

const createCat = async (req, res) => {
  try {
    const { title } = req.body;
    const filepath = req.file.path.replace(/\\/g, "/");
    const catlength = await CategoryModel.find().countDocuments();
    const category = await CategoryModel.create({
      title,
      img: filepath,
      id: catlength + 1,
    });
    return res.status(200).json({
      message: "category created successfully",
      category,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getCats = async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    return res.status(200).json({
      message: "categories fetched successfully",
      cats,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteCat = async (req, res) => {
  try {
    const id = req.params.id;
    await CategoryModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
  createCat,
  deleteCat,
  getCats,
};
