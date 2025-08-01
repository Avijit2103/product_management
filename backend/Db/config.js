const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
    console.error("CRITICAL ERROR: MONGODB_URI environment variable is not set!");
    console.error("Please ensure it's in your .env file (for local) or your hosting platform's environment variables (for deployment).");
    process.exit(1);
}

console.log("Attempting to connect to MongoDB Atlas with URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully!");
        console.log("Connected to database name:", mongoose.connection.name);
    })
    .catch(err => {
        console.error("MongoDB Atlas Connection Error:", err);
        console.error("Please check your MONGODB_URI for correctness and network access.");
        process.exit(1);
    });
