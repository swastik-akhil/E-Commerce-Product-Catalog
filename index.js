const express = require("express");
const app = express();
const router = require("./router/prodcuts");
require("dotenv").config();
const {PORT} = process.env;
// const path = require("path");

// app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

//db Connection
const {dbConnect} = require("./dbConnection")
dbConnect();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

const productsRouter = require("./router/prodcuts");
app.use("/api/v1/products", productsRouter);

const productRouter = require("./router/product");
// const { log } = require("console");
app.use("/api/v1/product", productRouter);

// app.get("/api/v1/homepage", (req,res)=>{
// 	res.render("index")
// })
// app.get("/api/v1/forms", (req,res)=>{
// 	res.render("forms")
// })




app.listen(PORT, ()=>{
	console.log(`Server is running at port ${PORT}`);
})
