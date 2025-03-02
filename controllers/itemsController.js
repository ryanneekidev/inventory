const queries = require('../db/queries');

async function getUsers(req, res){
    const items = await queries.getItems();
    res.status(200).render('items', {items: items})
}

module.exports = {
    getUsers
}