const queries = require('../db/queries');

async function getItems(req, res){
    const items = await queries.getItems();
    res.status(200).render('items', {items: items})
}

async function getItemsByCategory(req, res){
    const rawCategory = req.query.category;
    const category = rawCategory.charAt(0).toUpperCase()+rawCategory.slice(1);
    const items = await queries.getItemsByCategory(category);
    res.status(200).render('itemsByCategory', {items: items, category: category})
}

async function getItemsById(req, res){
    const id = req.query.itemId;
    const items = await queries.getItemsById(id);
    res.status(200).render('itemsById', {items: items, category: 'All'})
}

module.exports = {
    getItems,
    getItemsByCategory,
    getItemsById
}