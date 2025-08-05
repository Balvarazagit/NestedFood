const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const {  name, description, price, weight, rating, image, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !weight || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      description,
      price,
      weight,
      rating,
      image,
      category
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Failed to add product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;
    let products;

    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find({});
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, weight, rating, image, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !weight || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      weight,
      rating,
      image,
      category
    }, { new: true });

    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
 