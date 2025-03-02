// App setup
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res)=>{
    res.status(200).send('Hello, World!')
});

// Start server
app.listen(3000, ()=>{
    console.log('Server started at http://127.0.0.1:3000')
})