const express = require("express");
const router = express.Router();

const {getProduct, replaceProduct, updateProduct, deleteProduct} = require("../controllers/product");

router.route("/")
	.get(getProduct)
	.put(replaceProduct)
	.patch(updateProduct)
	.delete(deleteProduct)
//
// router.route("/expensive")
// 	.get()
//
// router.route("/not_available")
// 	.get()
//
// router.route("/buy")
// 	.get()

module.exports = router;