const express = require("express");
const router = express.Router();

const {getProduct, replaceProduct, updateProduct, deleteProduct, sortNProducts,getNotAvailableProducts, buyProduct} = require("../controllers/product");

router.route("/")
	.get(getProduct)
	.put(replaceProduct)
	.patch(updateProduct)
	.delete(deleteProduct)

router.route("/expensive")
	.get(sortNProducts)

router.route("/not_available")
	.get(getNotAvailableProducts)

router.route("/buy")
	.get(buyProduct)


module.exports = router;