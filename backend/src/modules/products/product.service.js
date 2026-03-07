import Product from "./product.model.js";


// Create new product
export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};


// Get all products
export const getAllProducts = async () => {
  const products = await Product.find().sort({ createdAt: -1 });
  return products;
};


// Get single product by ID
export const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};


// Update product
export const updateProduct = async (productId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );

  return updatedProduct;
};


// Delete product
export const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};