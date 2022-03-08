const knex = require('../db/connection')

function list(id) {
  return knex('tables as t')
    .join('reservations as r', 'r.reservation_id', 'rt.reservation_id')
    .select('*')
    .where({ reservation_id: id })
    .orderBy('table_name')
}

module.exports = {
  list,
  // create,
}
