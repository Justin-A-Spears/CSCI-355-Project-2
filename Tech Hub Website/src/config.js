const mongoose = require("mongoose"); 
const connect = mongoose.connect("mongodb://localhost:37017/TechHub");

//check database connection
connect.then(() => {
    console.log("Database connected successfully")
})
.catch(() => {
    console.log("Database cannot be connected")
})

// create schema 
const LoginSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    
});
// collection
const collection = new mongoose.model("users", LoginSchema); 

module.exports = collection; 
