const knex = require('../db/connection')

function list(date) {
  return knex("reservations")
    .whereNot({ status: "finished" })
    .andWhereNot({ status: "cancelled" })
    .andWhere({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id: reservation_id }).first();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((records) => records[0]);
}

module.exports = {
  list,
  read,
  create,
}
