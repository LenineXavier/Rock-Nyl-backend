const mongoose = require("mongoose");
const Schema = mongoose.Schema

const orderSchema = new Schema({
    product:{type: mongoose.Schema.Types.ObjectId, ref:"Product"},
    quantityPurchased:{type:Number, required:true, default: 1},
    totalAmount: {type:Number},
    date: {type: Date, default:Date.now},
    isDeleted:{type:Boolean, default:false},
    deletedDate:{type:Date},
});

module.exports = mongoose.model("Order", orderSchema);