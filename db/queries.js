const { get } = require('../routers/items');
const pool = require('./pool');

async function getItems(){
    const SQL = 'SELECT * FROM items';
    const {rows} = await pool.query(SQL);
    return rows
}

async function getItemsByCategory(category){
    const SQL = 'SELECT items.id, items.name AS name, categories.name AS category, items.price AS price FROM items JOIN item_categories_junction ON items.id = item_categories_junction.item_id JOIN categories ON item_categories_junction.category_id = categories.id WHERE categories.name = ($1);';
    const {rows} = await pool.query(SQL, [category]);
    return rows
}

async function getItemsById(id){
    const SQL = 'SELECT * FROM items WHERE id = ($1);';
    const {rows} = await pool.query(SQL, [id]);
    console.log(rows);
    return rows
}

module.exports = {
    getItems,
    getItemsByCategory,
    getItemsById
}