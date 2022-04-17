const mongoose = require('mongoose');
//Using mongodb uri to connect with data base
const mongoUri = "mongodb://localhost:27017/cloudnotebook?";

//Function to connect with data base
const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to Mongo succesfully");
    })
}

//Exporting that function of connecting with data base
module.exports = connectToMongo;