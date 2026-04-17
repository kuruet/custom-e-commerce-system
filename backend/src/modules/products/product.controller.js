import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getRecommendedProducts
} from "./product.service.js";

import cloudinary from "../../config/cloudinary.js";


// Create product
export const createProductController = async (req, res, next) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "products"
        }
      );

      imageUrl = result.secure_url;
    }

    const productData = {
      ...req.body,
      image: imageUrl
    };

    const product = await createProduct(productData);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};


// Get all products
export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};


// Get product by ID
export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ✅ CRITICAL FIX: prevent invalid ObjectId crash
    if (!id || id === "recommendations" || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};


// Update product
export const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};


// Delete product
export const deleteProductController = async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


/* =========================================================
   NEW: Get Recommended Products Controller
   ========================================================= */

export const getRecommendedProductsController = async (req, res, next) => {
  try {
    // 1. Extract query param
    const { cartProductIds } = req.query;

    // 2. Convert to array (safe parsing)
    let idsArray = [];

    if (cartProductIds) {
      idsArray = cartProductIds
        .split(",")
        .map(id => id.trim())
        .filter(Boolean);
    }

    // 3. Call service
    const recommendedProducts = await getRecommendedProducts(idsArray);

    // 4. Return response
    res.json({
      success: true,
      data: recommendedProducts
    });

  } catch (error) {
    next(error);
  }
};