require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();



require('./Db/config.js');

app.use(express.json());

app.use(cors({ origin: '*', methods: ['POST', 'GET', 'DELETE','PUT'], allowedHeaders: ['Content-Type'] }));

const User = require("./Db/users.js");
const Product = require("./Db/Product.js");


//cloudinary and multer
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

//clousinary-config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post("/reg", async (req, res) => {
    try {
        let users = new User(req.body);
        let result = await users.save();
        result = result.toObject();
        delete result.password;
        res.status(200).json({ message: "User registered successfully", data: result });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: "No user found with these credentials" });
            }
        } else {
            res.status(400).send({ message: "Email and password are required" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
});

//image upload endpoint

app.post('/upload-image', upload.single('productImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
            folder: 'e-commerce-product-images', // Optional: organize images in a specific folder on Cloudinary
            // You can add more options here, like transformations: { width: 300, height: 200, crop: "fill" }
        });

        res.json({ success: true, imageUrl: result.secure_url }); // Cloudinary provides secure_url
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ success: false, message: 'Image upload failed', error: error.message });
    }
});
app.post("/add-product", async (req, res) => {
    try {
        // Destructure new fields: imageUrl, quantity
        const { name, price, company, category, userId, imageUrl, quantity } = req.body;
        let product = new Product({ name, price, company, category, userId, imageUrl, quantity });
        let result = await product.save();
        res.status(201).send(result); // Use 201 for resource creation success
    } catch (error) {
        console.error("Add product error:", error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
});



app.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.status(200).send(products);
        } else {
            res.status(404).send({ message: "No products found" });
        }
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.status(200).send({ message: "Product deleted successfully", result });
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "No record found for this ID" });
        }
    } catch (error) {
        console.error("Get product by ID error:", error);
        res.status(500).json({ message: "Error fetching product by ID", error: error.message });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        // Destructure new fields: imageUrl, quantity
        const { name, price, company, category, userId, imageUrl, quantity } = req.body;
        let result = await Product.updateOne(
            { _id: req.params.id },
            { $set: { name, price, company, category, userId, imageUrl, quantity } } // Explicitly set all fields
        );
        if (result.matchedCount > 0) {
            res.status(200).send({ message: "Product updated successfully", result });
        } else {
            res.status(404).send({ message: "Product not found for update" });
        }
    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
