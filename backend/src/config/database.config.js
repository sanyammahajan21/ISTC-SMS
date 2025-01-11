const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL);
        console.log("\nDATABASE CONNECTION SUCCESSFULL");
    }
    catch(error){
        console.log("!!! ERROR IN DATABASE CONNECTION !!!");
        console.error(error);
        process.exit(1);
    }
}