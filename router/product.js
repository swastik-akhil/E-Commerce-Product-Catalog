const express = require("express");
const router = express.Router();

const {getProduct} = require("../controllers/product");

router.route("/:pid")
	.get(getProduct)
// 	.put()
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