const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
// Make sure to replace <username> and <password> with your actual Atlas credentials
mongoose.connect("mongodb+srv://yabhijit65:AFCvbKob90SiY1KM@e-commerce.tbzatxy.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce")
    .then(() => console.log("MongoDB Atlas Connected Successfully!"))
    .catch(err => console.error("MongoDB Atlas Connection Error:", err));