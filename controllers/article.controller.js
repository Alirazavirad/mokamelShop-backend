const ArticleModel = require("../models/article.model");

const createArticle = async (req, res) => {
  try {
    const { title, Desc } = req.body;
    const filepath = req.file.path.replace(/\\/g, "/");
    const artlength = await ArticleModel.find().countDocuments();
    const article = await ArticleModel.create({
      title,
      Desc,
      img: filepath,
      id: artlength + 1,
    });
    return res.status(200).json({
      message: "Article created successfully",
      article,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    await ArticleModel.findOneAndDelete({ id });
    return res.status(200).json({
      message: "article deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    return res.status(200).json({
      message: "articles fetched successfully",
      articles,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
module.exports = {
  createArticle,
  deleteArticle,
  getArticles
};
