const mongoose =  require("mongoose");
const productSchema = new mongoose.Schema({
	pid : {
		type : String,
		unique : true,
		// required : true                              //not working
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

productSchema.pre("save", function(next){
	this.pid = this._id.toString();
	console.log(this.pid)
	next();
})

module.exports = mongoose.model("Product", productSchema);