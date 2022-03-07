const knex = require('../db/connection')
const tableName = 'tables'

function list(date) {
    if (date) {
      return knex(tableName)
      .select('*')
      .where({ reservation_date: date })
      .orderBy('reservation_time')
    }
    return knex(tableName) 
      .select('*')
      .orderBy('reservation_time')
  }
  

  module.exports = {
    list,
    // create,
  }