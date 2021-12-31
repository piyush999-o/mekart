const express = require('express');
const productRouter = require('./routes/product')
const cors = require('cors');

const app = express();

app.use('/api/product', productRouter);

app.use((req, res, next) => {
    res.json({message: "App is Running"})
})

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

module.exports = app;
