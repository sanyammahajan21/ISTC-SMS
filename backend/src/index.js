// IMPORTING THE .env CONFIGURATION
require("dotenv").config({path: './.env'});
const { connectDB } = require("./config/database.config");

const PORT = process.env.PORT || 5000;


// INITIALISING THE EXPRESS APP/SERVER
const app = require("./app");


// CONNECTING THE SERVER WITH THE DATABASE
connectDB()
.then(() => {
    // ACTIVATING THE SERVER TO LISTEN
    app.listen(PORT, () => {
        console.log(`SERVER IS LISTENING AT THE PORT NO. ${PORT}\n`);
    })

    app.get("/", (req, res) => {
        res.send("Server is running");
    })
});


