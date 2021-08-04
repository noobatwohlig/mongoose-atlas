var express = require("express");
var logger = require("morgan");
var productController = require("./routes/product");
var app = express();
var port = 3000;

app.use(logger("dev"));
app.use(express.json());

app.use("/product", productController);

app.listen(port, console.log(`sevrer at ${port}`));
