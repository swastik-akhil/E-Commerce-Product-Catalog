const Product = require("../model/product");

async function getAllProducts(req,res){
	const products = await Product.findOne({});
	if(!products){
		return res.status(404).json({"msg" : "no user found"});
	}
		return res.status(200).json({"All Products": products});
}

async function addProduct(req,res){
	const {pid, name, description, price, inventory} = req.body;
	const newProduct = await Product.create({
		pid, name, description, price, inventory
	});
	if(!newProduct){return res.status(400).json({"msg" : "err" , "newProduct" :newProduct})}
	return res.status(200).json({"msg" : "successfully added new product", "product" : newProduct});
}

async function deleteAllProducts(req,res){
	await Product.deleteMany({});
	const item = await Product.findOne({})
	if(item){return res.status(400).json({"msg": "err, Entries are still there in DB" })}
	return res.status(200).json({"msg": "All entries DELETED successfully"});
}


module.exports = {
	getAllProducts,
	addProduct,
	deleteAllProducts
}

