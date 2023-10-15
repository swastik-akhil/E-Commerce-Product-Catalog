const {getAllProducts, addProduct, deleteAllProducts, filterProducts } = require("../controllers/products")
const express = require("express");
const router = express.Router();


router.route("/")
	.get(getAllProducts)
	.post(addProduct)
	.delete(deleteAllProducts)

router.route("/filter")
	.get(filterProducts)

module.exports = router;
