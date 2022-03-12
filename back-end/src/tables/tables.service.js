const knex = require('../db/connection')
const tableName = 'tables'

function list() {
  return knex('tables as t').select('*').orderBy('table_name')
}

function read(tableId) {
  return knex(tableName).select("*").where({ table_id: tableId }).first();
}

function occupy(table_id, reservation_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id, status: "occupied" });
}

function free(table_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: null, status: "free" });
}

function update(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

module.exports = {
  list,
  update,
  occupy,
  free,
  read,
}
