const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true, match: /\s/gm },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  userOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
