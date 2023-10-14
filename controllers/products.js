const Product = require("../model/product");

async function getAllProducts(req,res){
	const allUsers = await Product.find({});
	if(!allUsers){
		return res.status(404).json({"msg" : "no user found"});
	}
	return res.status(200).json(allUsers);
}

async function addProduct(req,res){
	console.log("under dev");
}

async function deleteAllProducts(req,res){
	console.log("under dev");
}

module.exports = {
	getAllProducts,
	addProduct,
	deleteAllProducts
}