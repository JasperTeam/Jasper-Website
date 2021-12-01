const express = require('express');
const app = express();
const router = express.Router();
const indexpages = require("./route/page.js");
const radiopages = require("./route/radios.js");
const categorypages = require('./route/category.js');
app.use(express.static(__dirname+"/public"))
app.use("/", indexpages);
app.use("/radio", radiopages)
app.use("/category", categorypages)
app.listen(3000);