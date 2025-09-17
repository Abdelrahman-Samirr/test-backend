console.log("hello world")

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express()

//middleware
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello From Node API Server')
})


// get all products
app.get('/api/products', async (req, res) => {

    try {
        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// get product by id
app.get('/api/product/:id', async (req, res) => {

    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// post product (add product)
app.post('/api/products', async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Update product
app.put('/api/product/:id', async (req, res) => {

    try {
        const {id} = req.params

        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
           return res.status(404).json({message: "Product not found"})
        }

        const updatedProduct = await Product.findById(id)
        
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Delete product
app.delete('/api/product/:id', async (req, res) => {

    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)

        if(!product){
           return res.status(404).json({message: "Product not found"})
        }
        
        res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




mongoose.connect("mongodb+srv://admin:Abdo%40123@backenddb.6zbntir.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to database")
    })
    .catch(() => {
        console.log("Connection failed")
    })

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})