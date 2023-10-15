const Product = require("../model/product");
function errorHandler(res,err){
	console.log("Some error occurred");
	console.log(err);
	return res.status(400).json({"msg" : "error occurred"})
}

async function getAllProducts(req,res){
	try{
		const products = await Product.find({});
		if ( !products) {
			console.log({"msg": "no product found"});
			return res.status(404).json({"msg": "no product found"});
		}
		return res.status(200).json({"All Products": products, "msg": "All products found", "total Products": products.length});
		// return res.status(200).render("allProducts", {"products": products})
	}
	catch(err){
		console.log("Some error occurred");
		console.log(err);
		res.status(400).json({"msg" : "error occurred"})
	}
}

async function addProduct(req,res){
	try{
		const {pid, name, description, price, inventory, category} = req.body;
		const searchByName = await Product.findOne({name: name});
		if (searchByName) {return res.status(400).json({"msg": "product with this name already exists"})}
		const newProduct = await Product.create({
			pid, name, description, price, inventory, category
		});
		if ( !newProduct) {
			return res.status(400).json({"msg": "err", "newProduct": newProduct})
		}
		// await newProduct.save();
		return res.status(200).json({"msg": "successfully added new product", "product": newProduct});
	}
	catch(err){
		errorHandler(res,err);
	}
}

async function deleteAllProducts(req,res){
	try{
		let entries = await Product.find({});
		if(!entries){return res.status(400).json({"msg" : "error occurred, no entries found"})}
		await Product.deleteMany({});
		entries = await Product.findOne({})
		if (entries) {
			return res.status(400).json({"msg": "err, Entries are still there in DB"})
		}
		return res.status(200).json({"msg": "All entries DELETED successfully"});
	}
	catch(err){
		errorHandler(res,err);
	}
}
async function filterProducts(req,res) {
	try {
		const category = req.query.category;
		if(!category){return res.status(400).json({"msg" : "category is missing"})}
		if(category === "aromaticPlant"){
			const list = await Product.find({category: "aromatic plant"});
			if ( !list) {
				return res.status(400).json({"msg": "no product found"})
			}
			return res.status(200).json({"msg": "list of aromatic plants", "list": list});
		}if(category === "medicinalPlant"){
			const list = await Product.find({category: "medicinal plant"});
			if ( !list) {
				return res.status(400).json({"msg": "no product found"})
			}
			return res.status(200).json({"msg": "list of medicinal plants", "list": list});
		}if(category === "culinaryHerb"){
			const list = await Product.find({category: "culinary herb"});
			if ( !list) {
				return res.status(400).json({"msg": "no product found"})
			}
			return res.status(200).json({"msg": "list of culinary herbs", "list": list});
		}if(category === "uncategorized"){
			const list = await Product.find({category: "uncategorized"});
			if ( !list) {
				return res.status(400).json({"msg": "no product found"})
			}
			return res.status(200).json({"msg": "list of uncategorized plants", "list": list});
		}

	} catch (err) {
		errorHandler(res, err);
	}
}


module.exports = {
	getAllProducts,
	addProduct,
	deleteAllProducts,
	filterProducts
}

