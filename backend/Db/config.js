const mongoose = require('mongoose');// This MUST be at the very top



if (!process.env.MONGODB_URI) {
    console.error("CRITICAL ERROR: MONGODB_URI environment variable is not set in .env!");
    process.exit(1);
}

// THIS IS THE CRUCIAL LOG I NEED TO SEE
console.log("Attempting to connect to MongoDB Atlas with URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully!");
        // THIS IS THE OTHER CRUCIAL LOG I NEED TO SEE
        console.log("Connected to database name:", mongoose.connection.name);
    })
    .catch(err => {
        console.error("MongoDB Atlas Connection Error:", err);
        console.error("Please check your MONGODB_URI in .env file (for local) or Vercel environment variables (for deployment).");
        process.exit(1);
    });


