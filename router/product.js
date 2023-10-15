const express = require("express");
const router = express.Router();

const {getProduct, replaceProduct} = require("../controllers/product");

router.route("/")
	.get(getProduct)
	.put(replaceProduct)
// 	.patch()
// 	.delete()
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