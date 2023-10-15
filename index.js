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


console.log(PORT)
// app.listen()
