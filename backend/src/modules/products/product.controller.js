import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
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
    const product = await getProductById(req.params.id);

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