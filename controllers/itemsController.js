// Node modules/utilities
const path = require('node:path');

// Setup EJS
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

const queries = require('../db/queries');

async function getUsers(req, res){
    const items = await queries.getItems;
    res.status(200).render('items', {items: items})
}

module.exports = {
    getUsers
}