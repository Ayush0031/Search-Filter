const express=require("express");
const { addProduct, getAllProducts, productSearch } = require("../controller/product.controller.js");
const router=express.Router();

router.post("/add",addProduct)
router.get("/all",getAllProducts)
router.get("/search",productSearch)
module.exports=router
