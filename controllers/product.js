const Product = require("../model/product");

async function getProduct(req,res){
	try{
		const pid = req.query.pid;
		const product = await Product.findOne({pid: pid});
		if ( !pid) {
			return res.status(200).json({"msg": "Product with this id does not exist"})
		}
		return res.status(200).json({"product": product});
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}

async function replaceProduct(req,res){
	try{
		let pid = req.query.pid;
		let replaceToPid = req.query.replaceToPid;

		let oldProduct = await Product.findOne({pid: pid});
		if ( !oldProduct) {
			return res.status(400).json({"msg": "product not found"})
		}

		let newProduct = await Product.findOne({pid: replaceToPid});
		if ( !newProduct) {
			return res.status(400).json({"msg": "product you want to replace not found"})
		}

		oldProduct.pid = newProduct.pid;
		oldProduct.name = newProduct.name;
		oldProduct.description = newProduct.description;
		oldProduct.price = newProduct.price;
		oldProduct.inventory = newProduct.inventory;

		const deleted = await Product.findOneAndDelete({pid: replaceToPid})

		return res.status(200).json({"msg" : "entries changed" })
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}


















module.exports = {getProduct, replaceProduct};