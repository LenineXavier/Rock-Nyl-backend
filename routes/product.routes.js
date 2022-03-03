const express = require("express");
const router = express.Router();

const ProductModel = require("../models/Product.model");

//add product
router.post("/create-product", async (req, res) => {
  try {
    const createProduct = await ProductModel.create(req.body);

    console.log(req.body);

    return res.status(201).json(createProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

//find by genre
router.get("/genre/:genre", async (req, res) => {
  try {
    const { genre } = req.params;

    const product = await ProductModel.find({ genre: genre });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

//find by artist
router.get("/artist/:artist", async (req, res) => {
  try {
    const { artist } = req.params;

    const product = await ProductModel.find({ artist: artist });

    console.log(product);

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

//edit product
router.patch("/edit-product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updateProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

// HARD DELETE
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await ProductModel.deleteOne({ _id: id });

    return res.status(200).json(deleteProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

module.exports = router;
