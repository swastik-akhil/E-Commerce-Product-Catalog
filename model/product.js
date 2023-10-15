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
	},
	category : {
		type : String,
		required : false,
		default : "uncategorized"
	}

})

productSchema.pre("save", function(next){
	this.pid = this._id.toString();
	next();
})

module.exports = mongoose.model("Product", productSchema);