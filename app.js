const express = require('express');
const productRouter = require('./routes/product.js')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use('/api/product', productRouter);

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));


app.listen(port, () => {
    console.log(`App Start Listening at PORT ${port}`);
});