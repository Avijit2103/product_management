const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    userId:String,
    company:String,
    imageUrl: { // NEW FIELD: URL to the image hosted on Cloudinary
        type: String,
        default: 'https://via.placeholder.com/300x200?text=No+Image', // Default placeholder if no image is provided
    },
    quantity: { // NEW FIELD: Quantity of the product
        type: Number,
        default: 0, // Default to 0 if not specified (for 'out of stock' logic)
    },
});

module.exports = mongoose.model("products",productSchema)