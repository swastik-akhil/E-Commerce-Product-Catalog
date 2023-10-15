const Product = require("../model/product");

async function getProduct(req,res){
	const pid = req.params.pid;
	const product = await Product.findOne({pid : pid});
	if(!pid){return res.status(200).json({"msg" : "Product with this id does not exist"})}
	return res.status(200).json({"product" : product});
}



















module.exports = {getProduct};