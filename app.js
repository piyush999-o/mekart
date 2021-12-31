const express = require('express');
const ConnectToMongo = require('./db.js');
const Product = require('./models/Product.js');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8000;

ConnectToMongo();

app.get('/api/product', async (req, res) => {
    const products = await Product.find()
    res.json(products)
})

// set Storage path of multer for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const date = Date.now().toString();
        const filename = date.replace(" ", "-");
        cb(null, filename + file.originalname);
    }
});

const upload = multer({ storage: storage });

// ROUTE:2 for Creating product using POST - /product/new
app.post('/api/product/new', upload.single('productImage'), async (req, res) => {
    const { title, description, category, price } = req.body;
    let { path } = req.file;
    path = path.replace("\\", "/")
    path = path.replace("uploads/", "/")
    const product = new Product({
        title, description, category, price, productImage: path
    })
    const savedProduct = await product.save()
    res.json(savedProduct)
})

// ROUTE:3 for Deleting product using DELETE - /product/delete/:id
app.delete('/api/product/:_id', async (req, res) => {
    const productId = req.params._id
    const product = await Product.findByIdAndDelete(productId)
    res.json(`(${product}) deleted Successfully`)
})

// ROUTE:4 for Getting Particular Product information using GET - /product/:id
app.get('/api/product/:_id', async (req, res) => {
    const productId = req.params._id
    const product = await Product.findById(productId)
    res.json(product)
})

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));


app.listen(port, () => {
    console.log(`App Start Listening at PORT ${port}`);
});