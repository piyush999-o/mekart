const mongoose = require('mongoose')


const ConnectToMongo = () => {
    const mongoURI = "mongodb+srv://piyush-999:mekart999@mekart.hvwbt.mongodb.net/mekart"
    mongoose.connect(mongoURI, () => {
        console.log("Connnected to mongo Successfully")
    })
}

module.exports = ConnectToMongo;
