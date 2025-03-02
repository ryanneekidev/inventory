const { get } = require('../routers/items');
const pool = require('./pool');

async function getItems(){
    const SQL = 'SELECT * FROM items';
    const {rows} = await pool.query(SQL);
    return rows;
}

module.exports = {
    getItems
}