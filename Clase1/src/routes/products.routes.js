const router = require("express").Router();
const {
  getAllProducts,
  getProductId,
  getProductName,
} = require("../controllers/products.controllers");

router.get("/products", getAllProducts);

//http://localhost:3500/api/product/1
router.get("/product/:id", getProductId);

//query params
//http://localhost:3500/api/productName?name=pan&precio=5

router.get("/productName", getProductName);

module.exports = router;
