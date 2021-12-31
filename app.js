const express = require('express');
const router = require('./routes/product.js')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

app.use('/', router);

app.listen(port, () => {
    console.log(`App Start Listening at PORT ${port}`);
});