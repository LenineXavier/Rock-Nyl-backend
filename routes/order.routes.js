const express = require("express");
const router = express.Router();

const OrderModel = require("../models/Order.model");
const ProductModel = require("../models/Product.model");


// Cria uma order
router.post("/create-order", async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.body.product });

    if (product.stock - req.body.quantityPurchased < 0) {
      return res.status(400).json({ msg: `Only ${product.stock}` });
    }

    const createdOrder = await OrderModel.create({
      ...req.body,
      totalAmount: product.price * req.body.quantityPurchased,
    });

    await ProductModel.updateOne(
      { _id: req.body.product },
      {
        $push: { OrderList: createdOrder._id },
        stock: product.stock - createdOrder.quantityPurchased,
      },
      { new: true, runValidators: true }
    );

    await OrderModel.updateOne(
      { _id: req.body.product },
      {
        $push: { productsOrderList: product },
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ createdOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});


// Mostra as info da Order pelo ID
router.get("/order-details/:orderId", async (req, res) => {
  try {
    if (!req.params.orderId) {
      return res
        .status(400)
        .json({ msg: "Request without order ID in route." });
    }

    const foundedOrder = await OrderModel.findOne({
      _id: req.params.orderId,
    }).populate("product");

    return res.status(200).json(foundedOrder);
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
});

//Soft delete
router.delete("/delete-order/:orderId", async (req, res) => {
  const order = await OrderModel.findOne({ _id: req.params.orderId });
  console.log(order);
  if (!order) {
    return res.status(400).json({ msg: "Order not found!" });
  }

  await OrderModel.findOneAndUpdate(
    { _id: req.params.orderId },
    { isDeleted: true, deletedDate: Date.now() },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ msg: "Ok" });
});
module.exports = router;
