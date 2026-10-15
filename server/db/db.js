const mongoose = require("mongoose");


async function connectToDb(){
    try{
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Connected to MongoDB");

    }catch(err){
        console.error("MongoDB connection failed:", err);
    }
}


module.exports = connectToDb