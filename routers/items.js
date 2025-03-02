// App setup
const express = require('express');
const app = express();

// Node modules/utilities
const path = require('node:path');

// Setup EJS
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// Routes
app.get('/', (req, res)=>{
    res.status(200).render('items', {items: items})
});

// Export router
module.exports = app;