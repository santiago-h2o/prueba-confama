import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: String },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
