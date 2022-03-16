const knex = require('../db/connection')

function list(date) {
  return knex('reservations')
    .select('*')
    .whereNot({ status: 'finished' })
    .andWhereNot({ status: 'cancelled' })
    .andWhere({ reservation_date: date })
    .orderBy('reservation_time')
}

function read(reservation_id) {
  return knex('reservations').where({ reservation_id: reservation_id }).first()
}

function create(newReservation) {
  return knex('reservations')
    .insert(newReservation, '*')
    .then((records) => records[0])
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((records) => records[0]);
}

module.exports = {
  list,
  read,
  create,
  update
}
