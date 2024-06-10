const Product=require("../models/product.model.js")

const addProduct= async(req,res)=>{
    try {
        await Product.create(req.body)
        res.status(201).send({msg:"Product added Successfully"})
    } catch (error) {
        res.status(500).send({msg:"Not able to add products"})
    }
}
const getAllProducts= async(req,res)=>{
    try {
        const data= await Product.find();
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send({msg:"Not able to add products"})
    }
}
module.exports={addProduct,getAllProducts}