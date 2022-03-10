const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  artist: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },

  albumName: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true,
  },

  description: {
    type: String,
    maxlength: 1500,
    minlength: 1,
    required: true,
    unique: true,
    trim: true,
  },

  type: {
    type: String,
    maxlength: 128,
    minlength: 1,
    required: true,
    trim: true,
  },

  details: [{ type: String, maxlength: 64 }],

  price: { type: Number, required: true },

  stock: { type: Number, required: true, default: 0 },

  url_img: { type: String, required: true },

  OrderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Product", productSchema);
