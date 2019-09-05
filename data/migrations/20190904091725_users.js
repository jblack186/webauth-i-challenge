
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
    tbl.increments()
    tbl.string('username', 12)
    .unique()
    .notNullable()
    tbl.string('password', 12)
    .unique()
    .notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};

