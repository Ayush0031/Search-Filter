const Product=require("../models/product.model.js")

const addProduct= async(req,res)=>{
    try {
        await Product.create(req.body)
        res.status(201).send({msg:"Product add Successfully"})
    } catch (error) {
        res.status(501).send({msg:"Not able to add products"})
    }
}