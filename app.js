// App setup
const express = require('express');
const app = express();

// Node modules/utilities
const path = require('node:path');

// Setup EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Dotenv setup
require('dotenv').config();

// Import routers
const itemsRouter = require('./routers/items');

// Routes
app.get('/', (req, res)=>{
    res.status(200).render('index', {})
});

app.use('/items', itemsRouter);

// Start server
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server started at http://127.0.0.1:3000')
})