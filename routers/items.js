// App setup
const express = require('express');
const app = express();

// Node modules/utilities
const path = require('node:path');

// Setup EJS
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// Import controllers
const itemsController = require('../controllers/itemsController');

// Routes
app.get('/', (req, res)=>{
    if(req.query.category){
        itemsController.getItemsByCategory(req, res)
    }else if(req.query.itemId){
        itemsController.getItemsById(req, res)
    }else{
        itemsController.getItems(req, res)
    }
});

// Export router
module.exports = app;