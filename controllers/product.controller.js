const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { title, category, price, shortDesc, longDesc, score, weight } =
      req.body;
    const filepath = req.file.path.replace(/\\/g, "/");
    const cats = await CategoryModel.findOne({ id: category });
    const isExist = await ProductModel.findOne({ title });
    if (isExist) {
      return res.status(400).json({
        message: "product already exists",
      });
    }
    const productlength = await ProductModel.find().countDocuments();
    const product = await ProductModel.create({
      title,
      price,
      id: productlength + 1,
      score,
      shortDesc,
      longDesc,
      weight,
      img: filepath,
      category: cats._id,
    });
    return res.status(200).json({
      message: "product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category");
    return res.status(200).json({
      message: "products fetched successfully",
      products,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const editById = async (req, res) => {
  try {
    const id = req.params.id;
    const { price } = req.body;
    await ProductModel.findOneAndUpdate(
      { id },
      {
        $set: {
          price,
        },
      }
    );
    return res.status(200).json({
      message: "product updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getBycats = async (req,res) => {
  try {

    const id = req.params.id
    const products = await ProductModel.find().populate("category")
    return res.status(200).json({
      message : "products fetched successfully",
      products : products.filter(item => item.category.id == id)
    })
  }catch (err) {
    return res.status(500).json({err})
  }
}
module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  editById,
  getBycats
};
