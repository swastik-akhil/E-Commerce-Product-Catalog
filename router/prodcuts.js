const {getAllProducts, addProduct, deleteAllProducts } = require("../controllers/products")
const express = require("express");
const router = express.Router();


router.route("/")
	.get(getAllProducts)
	.post(addProduct)
	.delete(deleteAllProducts)

module.exports = router;
