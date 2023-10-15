const mongoose = require("mongoose");
require("dotenv").config();
const {MONGODB_URL} = process.env;
const dbConnect = async function (){
	await mongoose.connect(MONGODB_URL, {useNewUrlParser : true , useUnifiedTopology : true} )  //this ensures that mongodb uses new url parser which is new and improved url parser and that mongodb uses new unified topology engine.
		.then(()=>{console.log("DB CONNECTED SUCCESSFULLY")})
		.catch((err)=>{
			console.log("DB CONNECTION FAILED");
			console.log(err);
		})
}

module.exports = {dbConnect};
