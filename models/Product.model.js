const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function arrayLimit(arr) {
  return arr.length <= 5;
}

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

  details: [{ type: String, maxlength: 32 }],

  trackList: { type: String },

  // Limitar quantidade de itens na array
  genre: {
    type: [{ type: String, maxlength: 32, trim: true }],
    validate: [arrayLimit, "5 genres only allowed."],
  },

  price: { type: Number, required: true },

  stock: { type: Number, required: true, default: 0 },

  OrderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Product", productSchema);
