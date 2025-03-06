const { get } = require('../routers/items');
const pool = require('./pool');

async function getItems(){
    const SQL = 'SELECT * FROM items';
    const {rows} = await pool.query(SQL);
    return rows
}

async function getItemsByCategory(category){
    const SQL = 'SELECT items.id, items.name AS name, categories.name AS category, items.price AS price FROM items JOIN item_categories_junction ON items.id = item_categories_junction.item_id JOIN categories ON item_categories_junction.category_id = categories.id WHERE categories.name = $1;';
    const {rows} = await pool.query(SQL, [category]);
    return rows
}

async function getItemsById(id){
    const SQL = 'SELECT * FROM items WHERE id = $1;';
    const {rows} = await pool.query(SQL, [id]);
    return rows
}

async function addItem(name, price){
    const SQL = 'INSERT INTO items (name, price) VALUES ($1,$2)';
    await pool.query(SQL, [name, price])
}

async function updateItem(id, name, price){
    const SQL = 'UPDATE items SET name=$2, price=$3 WHERE id=$1';
    await pool.query(SQL, [id, name, price])
}

async function deleteItem(id){
    const SQL1 = 'DELETE FROM item_categories_junction WHERE item_id=$1';
    const SQL2 = 'DELETE FROM items WHERE id=$1';
    await pool.query(SQL1, [id]),
    await pool.query(SQL2, [id])
}

module.exports = {
    getItems,
    getItemsByCategory,
    getItemsById,
    addItem,
    updateItem,
    deleteItem
}