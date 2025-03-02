// App setup
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res)=>{
    res.status(200).send('Items page')
});

// Export router
module.exports = app;