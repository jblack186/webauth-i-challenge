const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findBy,
    add
 
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({id}).first();
}

function add(userData) {
    return db('users').insert(userData)
    .then(ids => {
        return findById(ids[0]);
    })
}

function findBy(filter) {
    return db('users').where(filter);
  }