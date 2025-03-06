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

async function addItem(name, price, categoryId){
    const SQL = 'INSERT INTO items (name, price) VALUES ($1,$2)';
    const SQL3 = 'SELECT * FROM items ORDER BY id DESC LIMIT 1';
    const SQL2 = 'INSERT INTO item_categories_junction (item_id, category_id) VALUES ($1, $2)';
    await pool.query(SQL, [name, price]);
    const {rows} = await pool.query(SQL3);
    const itemId = rows[0].id;
    await pool.query(SQL2, [itemId, categoryId])
}

async function updateItem(id, name, price, category_id){
    const SQL = 'UPDATE items SET name=$2, price=$3 WHERE id=$1';
    const SQL2 = 'UPDATE item_categories_junction SET category_id=$2 WHERE item_id=$1';
    await pool.query(SQL, [id, name, price]);
    await pool.query(SQL2, [id, category_id])
}

async function deleteItem(id){
    const SQL1 = 'DELETE FROM item_categories_junction WHERE item_id=$1';
    const SQL2 = 'DELETE FROM items WHERE id=$1';
    await pool.query(SQL1, [id]),
    await pool.query(SQL2, [id])
}

async function getCategories(id){
    const SQL = 'SELECT * FROM categories';
    const {rows} = await pool.query(SQL);
    return rows
}

async function getItemCategoryByItemId(id){
    const SQL = 'SELECT item_id, category_id, name FROM item_categories_junction JOIN categories ON item_categories_junction.category_id = categories.id WHERE item_id=$1;'
    const {rows} = await pool.query(SQL, [id]);
    return rows;
}

async function getItemCategoryIdByItemId(id){
    const SQL = 'SELECT item_categories_junction.item_id, item_categories_junction.category_id FROM items JOIN item_categories_junction ON items.id = item_categories_junction.item_id WHERE item_id=$1'
    const {rows} = await pool.query(SQL, [id]);
    return rows;
}

module.exports = {
    getItems,
    getItemsByCategory,
    getItemsById,
    addItem,
    updateItem,
    deleteItem,
    getCategories,
    getItemCategoryByItemId,
    getItemCategoryIdByItemId
}