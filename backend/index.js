const express = require('express');
const cors = require('cors')
const app = express()
require('./Db/config.js')
app.use(express.json());
app.use(cors({ origin: '*', methods: ['POST', 'GET', 'DELETE','PUT'], allowedHeaders: ['Content-Type'] }));

const User = require("./Db/users.js");
const Product = require("./Db/Product.js")
app.post("/reg", async (req, res) => {
    let users = new User(req.body);
    let result = await users.save();
    result = result.toObject();
    delete result.password
    // Ensure a response with status 200
    res.status(200).json({ message: "User registered successfully", data: result });
});
app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user);
        }
        else {
            res.send({})
        }
    }
    else {
        res.send({});
    }



})
app.get("/products", async (req, res) => {
    let products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send("no product found")
    }
})
app.delete("/products/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
});
app.get("/products/:id",async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"No record found"})
    }
})
app.put("/products/:id", async (req,res)=>{
    let result = await Product.updateOne(
       {_id:req.params.id},
    {
        $set:req.body
    })
    res.send(result)
})
app.listen(5000);