const express = require('express');
const productRouter = require('./product')
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;

app.use('/api/product', productRouter);

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})

app.get('/', (req, res) => {
    res.json({"Message": "Server is Running"})
})

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

app.listen(port, () => {
    console.log(`App Start Listening on port ${port}`)
})
