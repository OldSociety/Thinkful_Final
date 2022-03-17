const knex = require('../db/connection')

const tableName = 'reservations'

// List data by date or mobile number
function list(date, mobile_number) {
  if (date) {
    return knex(tableName)
      .select('*')
      .where({ reservation_date: date })
      .orderBy('reservation_time', 'asc')
  }

  if (mobile_number) {
    return knex(tableName)
      .select('*')
      .where('mobile_number', 'like', `${mobile_number}%`)
  }

  return knex(tableName).select('*')
}

// Create a new reservation
function create(reservation) {
  return knex(tableName).insert(reservation).returning('*')
}

// Read a single reservation
function read(reservation_id) {
  return knex(tableName)
    .select('*')
    .where({ reservation_id: reservation_id })
    .first()
}

// Update a single reservation's status
function update(reservation_id, status) {
  return knex(tableName)
    .where({ reservation_id: reservation_id })
    .update({ status: status })
}

// Edit the information in a single booked reservation
function edit(reservation_id, reservation) {
  return knex(tableName)
    .where({ reservation_id: reservation_id })
    .update({ ...reservation })
    .returning('*')
}

module.exports = {
  list,
  create,
  read,
  update,
  edit,
}
