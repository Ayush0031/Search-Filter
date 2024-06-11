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
const productSearch= async(req,res)=>{
    try {
        let query = {};

        // Search by name
        if (req.query.query) {
            query.name = { $regex: req.query.query, $options: 'i' };
        }

        // Filter by category
        if (req.query.categories) {
            query.category = { $in: req.query.categories.split(',') };
        }

        // Filter by price range
        if (req.query.minPrice && req.query.maxPrice) {
            query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }

        const products = await Product.find(query);
        console.log(query)
        console.log(products)
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
module.exports={addProduct,getAllProducts,productSearch}