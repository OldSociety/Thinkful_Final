const knex = require('../db/connection')
const tableName = 'tables'

function list() {
  return knex('tables as t').select('*').orderBy('table_name')
}

// function read(tableId) {
//   return knex('table').select('*').where({ table_id: tableId }).first()
// }

function update(table_id) {
  // return knex(tableName).select({table_id: table_id})
}

module.exports = {
  list,
  update,
  // read,
}
