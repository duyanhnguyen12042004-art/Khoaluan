import * as productService from "../services/productService.js";

export async function getAllProducts(req, res) {
  try {
    const products =
      await productService.getAllProducts();

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getProductById(req, res) {
  try {
    const product =
      await productService.getProductById(
        req.params.id
      );

    res.json(product);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
}

export async function createProduct(req, res) {
  try {
    const product =
      await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    res.json(product);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const result =
      await productService.deleteProduct(
        req.params.id
      );

    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}