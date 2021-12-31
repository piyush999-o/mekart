const express = require('express');
const ConnectToMongo = require('../db.js')
const Product = require('../models/Product.js')
const router = express.Router();
const multer = require('multer');

ConnectToMongo();

// ROUTE:1 for Getting all products using GET - /product/
router.get('/', async (req, res) => {
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
router.post('/new', upload.single('productImage'), async (req, res) => {
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
router.delete('/:_id', async (req, res) => {
    const productId = req.params._id
    const product = await Product.findByIdAndDelete(productId)
    res.json(`(${product}) deleted Successfully`)
})

// ROUTE:4 for Getting Particular Product information using GET - /product/:id
router.get('/:_id', async (req, res) => {
    const productId = req.params._id
    const product = await Product.findById(productId)
    res.json(product)
})


module.exports = router;
