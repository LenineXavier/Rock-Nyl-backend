const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantityPurchased: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number },
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
  productsOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const OrderModel = model("Order", orderSchema);

module.exports = OrderModel;
