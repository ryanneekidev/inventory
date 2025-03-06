// App setup
const express = require('express');
const app = express();

// Node modules/utilities
const path = require('node:path');

// Setup EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// POST requests config
app.use(express.urlencoded({ extended: true }));

// Dotenv setup
require('dotenv').config();

// Import routers
const itemsRouter = require('./routers/items');

// Import controllers
const itemsController = require('./controllers/itemsController');

// Import database queries
const queries = require('./db/queries')

// Routes
app.get('/', (req, res)=>{
    res.status(200).render('index', {})
});

app.use('/items', itemsRouter);

app.get('/add', async (req, res)=>{
    const categories = await queries.getCategories(); 
    res.status(200).render('newItemForm', {categories: categories})
})

app.get('/edit', async (req, res)=>{
    const items = await queries.getItemsById(Number(req.query.itemId));
    const item = items[0];
    res.status(200).render('editItem', {item: item})
})

app.post('/add', itemsController.addItem);

app.post('/edit', itemsController.updateItem);

app.get('/delete', itemsController.deleteItem);

// Start server
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server started at http://127.0.0.1:3000')
})