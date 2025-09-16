console.log("hello world")

const express = require('express');
const mongoose = require('mongoose');

const app = express()


app.get('/', (req, res) => {
    res.send('Hello From Node API Server')
})

app.post('/api', (req, res) => {
    res.send('Data received')
})

mongoose.connect("mongodb+srv://admin:Abdo%40123@backenddb.6zbntir.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
})
.catch(() => {
    console.log("Connection failed")
})