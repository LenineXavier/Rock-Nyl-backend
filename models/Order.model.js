// const mongoose = require("mongoose");
// const { Schema, model } = require("mongoose");3

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantityPurchased: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number },
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
  productsOrderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Order", orderSchema);

// const OrderModel = model("Order", orderSchema);

// module.exports = OrderModel;
