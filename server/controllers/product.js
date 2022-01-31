const Product = require("../models/product");
const slugify = require("slugify");

exports.insert = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let slug = req.body.slug ? {slug: req.body.slug} : {}
  let products = await Product.find(slug)
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

