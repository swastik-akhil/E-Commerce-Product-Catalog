const express = require("express");
const app = express();
const router = require("./router/prodcuts");
require("dotenv").config();
const {PORT} = process.env;
console.log(PORT)

// app.listen()
