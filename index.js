const express = require("express");
const app = express();
const router = require("./router/prodcuts");
require("dotenv").config();
const {PORT} = process.env;

//db Connection
const {dbConnect} = require("./dbConnection")
dbConnect();

//middlewares
app.use(express.json());

//routes

const productsRouter = require("./router/prodcuts");
app.use("/api/v1/products", productsRouter);

const productRouter = require("./router/product");
app.use("/api/v1/product", productRouter);




app.listen(PORT, ()=>{
	console.log(`Server is running at port ${PORT}`);
})
