const knex = require('../db/connection')
const tableName = 'tables'

function list(id) {
    if (id) {
      return knex(tableName)
      .select('*')
      .where({ reservation_id: id })
      .orderBy('table_name')
    }}
  

  module.exports = {
    list,
    // create,
  }