const Product = require("../model/product");

function errorHandler(res,err){
	console.log("Some error occurred");
	console.log(err);
	return res.status(400).json({"msg" : "error occurred"})
}
async function getProduct(req,res) {
	try {
		const pid = req.query.pid;
		if(!pid){return res.status(400).json({"msg" : "Product id is missing"})}
		const product = await Product.findOne({pid: pid});
		if ( !pid) {
			return res.status(200).json({"msg": "Product with this id does not exist"})
		}
		return res.status(200).json({"product": product});
	} catch (err) {
		errorHandler(res,err);
	}
}
async function replaceProduct(req,res){
	try{
		let pid = req.query.pid;
		if(!pid){return res.status(400).json({"msg" : "Product id is missing"})}
		let body = req.body;

		let oldProduct = await Product.findOne({pid: pid});
		if ( !oldProduct) {
			return res.status(400).json({"msg": "product not found"})
		}

		const newProduct = await Product.create({
			name : body.name,
			description : body.description,
			price : body.price,
			inventory : body.inventory
		})

		if(!newProduct){return res.status(400).json({"msg" : "error occurred, new product not created"})}

		if(newProduct.name===oldProduct.name){return res.status(400).json({"msg" : "product name is same"})}

		oldProduct.pid = newProduct.pid;
		oldProduct.name = newProduct.name;
		oldProduct.description = newProduct.description;
		oldProduct.price = newProduct.price;
		oldProduct.inventory = newProduct.inventory;

		const deleted = await Product.findOneAndDelete({pid: newProduct.pid})
		await oldProduct.save();

		return res.status(200).json({"msg" : "entries changed" })
	}
	catch(err){
		errorHandler(res,err);
	}
}

async function updateProduct(req,res){
	try{
		const pid = req.query.pid;
		if(!pid){return res.status(400).json({"msg" : "Product id is missing"})}
		const product = await Product.findOne({pid : pid});
		if(!product){return res.status(400).json({"msg" : "product not found"})}
		if(req.body.name){
			product.name = req.body.name;
		}
		if(req.body.description){
			product.description = req.body.description;
		}
		if(req.body.price){
			if(req.body.price <= 0){return res.status(400).json({"msg" : "Not a valid price"})}
			product.price = req.body.price;
		}
		if(req.body.inventory){
			product.inventory = req.body.inventory;
		}
		await product.save();

		return res.status(200).json({"msg" : "product entries updated successfully", "product" : product })

	}
	catch(err){
		errorHandler(res,err);
	}
}

async function deleteProduct(req,res){
	try{
		const pid = req.query.pid;
		if(!pid){return res.status(400).json({"msg" : "Product id is missing"})}
		const product = await Product.findOne({pid : pid});
		if(!product){return res.status(400).json({"msg" : "product not found"})}
		const deleted = await Product.findOneAndDelete({pid : pid});
		return res.status(200).json({"msg" : "entry deleted successfully" })
	}
	catch(err){
		errorHandler(res,err);
	}
}

async function sortNProducts(req,res){

	try{
		const number = req.query.number;
		if(!number){return res.status(400).json({"msg" : "Number is missing"})}
		if(number<=0){return res.status(400).json({"msg" : "Not a valid number"})}

		const allProducts = await Product.find({});
		if(!allProducts){return res.status(400).json({"msg" : "No products found"})}


		allProducts.sort((a,b) => b.price - a.price);
		console.log(allProducts);
		let result = [];
		for(let i=0; i<number; i++){
			result.push(allProducts[i])
		}
		res.status(200).json({"number of most expensive products" : number, "products" : result})
	}
	catch(err){
		errorHandler(res,err);
	}
}

async function getNotAvailableProducts(req,res){
	try{
		const allProducts = await Product.find({});
		if ( !allProducts) {
			return res.status(400).json({"msg": "No products found"})
		}

		let result = [];
		for (let i = 0; i < allProducts.length; ++i) {
			if (allProducts[i].inventory === 0) {
				result.push(allProducts[i])
			}
		}
		if (result.length === 0) {
			return res.status(400).json({"msg": "No products found"})
		}
		res.status(200).json({"products": result})
	}
	catch(err){
		errorHandler(res,err);
	}
}

async function buyProduct(req,res){
	try{
		const pid = req.query.pid;
		if ( !pid) {
			return res.status(400).json({"msg": "Product id is missing"})
		}
		const product = await Product.findOne({pid: pid});
		if ( !product) {
			return res.status(400).json({"msg": "product not found"})
		}
		if (product.inventory === 0) {
			return res.status(400).json({"msg": "product not available"})
		}
		product.inventory -= 1;
		await product.save();
		return res.status(200).json({"msg" : "product bought successfully", "product" : product})
	}
	catch(err){
		errorHandler(res,err);
	}

}



module.exports = {getProduct, replaceProduct,updateProduct, deleteProduct, sortNProducts,getNotAvailableProducts, buyProduct};