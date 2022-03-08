const knex = require('../db/connection')

function list() {
  return knex('tables as t')
    .select('*')
    .orderBy('table_name')
}


module.exports = {
  list
}
