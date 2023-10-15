const Product = require("../model/product");

async function getAllProducts(req,res){
	try{
		const products = await Product.findOne({});
		if ( !products) {
			console.log({"msg": "no product found"});
			return res.status(404).json({"msg": "no product found"});
		}
		return res.status(200).json({"All Products": products});
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}

async function addProduct(req,res){
	try{
		const {pid, name, description, price, inventory} = req.body;
		const newProduct = await Product.create({
			pid, name, description, price, inventory
		});
		if ( !newProduct) {
			return res.status(400).json({"msg": "err", "newProduct": newProduct})
		}
		return res.status(200).json({"msg": "successfully added new product", "product": newProduct});
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}

async function deleteAllProducts(req,res){
	try{
		await Product.deleteMany({});
		const item = await Product.findOne({})
		if (item) {
			return res.status(400).json({"msg": "err, Entries are still there in DB"})
		}
		return res.status(200).json({"msg": "All entries DELETED successfully"});
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}


module.exports = {
	getAllProducts,
	addProduct,
	deleteAllProducts
}

