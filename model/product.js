const mongoose =  require("mongoose");
const productSchema = new mongoose.Schema({
	pid : {
		type : String,
		unique : true,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	description : {
		type : String,
		default : ''
	},
	price : {
		type : Number,
		required : true
	},
	inventory : {
		type : Number,
		required : true,
		default : 0
	}

})

module.exports = mongoose.model("Product", productSchema);