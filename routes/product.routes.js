const express = require("express");
const router = express.Router();

const ProductModel = require("../models/Product.model");

const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// show all artists
router.get("/all-artists", async (req, res) => {
  try {
    const allArtists = await ProductModel.find({});

    return res.status(201).json(allArtists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
});

//add product ONLY ADMIN ROLE
router.post(
  "/create-product",
  isAuthenticated,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const createProduct = await ProductModel.create(req.body);

      return res.status(201).json(createProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: JSON.stringify(error) });
    }
  }
);

//find by ID ALBUM
router.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.find({ _id: id });

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

//edit product ONLY ADMIN ROLE
router.patch(
  "/edit-product/:id",
  isAuthenticated,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
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
  }
);

// HARD DELETE
router.delete(
  "/delete-product/:id",
  isAuthenticated,
  attachCurrentUser,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const deleteProduct = await ProductModel.deleteOne({ _id: id });

      return res.status(200).json(deleteProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: JSON.stringify(error) });
    }
  }
);

module.exports = router;
