const express=require("express");
const { addProduct, getAllProducts } = require("../controller/product.controller.js");
const router=express.Router();

router.post("/add",addProduct)
router.get("/all",getAllProducts)

module.exports=router
