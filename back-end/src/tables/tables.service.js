const knex = require('../db/connection')

const tableName = 'tables'

// List all tables
function list() {
  return knex(tableName).select('*')
}

// Create a new table
function create(table) {
  return knex(tableName).insert(table).returning('*')
}

// Read a single table by id
function read(table_id) {
  return knex(tableName).select('*').where({ table_id: table_id }).first()
}

// Read a single reservation
function readReservation(reservation_id) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: reservation_id })
    .first()
}

// Mark a table as occupied
function occupy(table_id, reservation_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id, status: 'occupied' })
}

// Mark a table as free
function free(table_id) {
  return knex(tableName)
    .where({ table_id: table_id })
    .update({ reservation_id: null, status: 'free' })
}

// Update reservation status when table is freed
function updateReservation(reservation_id, status) {
  return knex('reservations')
    .where({ reservation_id: reservation_id })
    .update({ status: status })
}

module.exports = {
  list,
  create,
  read,
  occupy,
  free,
  readReservation,
  updateReservation,
}
