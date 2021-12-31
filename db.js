const mongoose = require('mongoose')


const ConnectToMongo = () => {
    const mongoURI = "mongodb://localhost:27017/MeKart"
    mongoose.connect(mongoURI, () => {
        console.log("Connnected to mongo Successfully")
    })
}

module.exports = ConnectToMongo;
