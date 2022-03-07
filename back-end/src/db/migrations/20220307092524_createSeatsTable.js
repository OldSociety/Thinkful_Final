exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary().unsigned()
    table.string("table_name").notNullable()
    table.integer("capacity").notNullable().unsigned()
    table.integer("reservation_id").defaultTo(null)
    table.foreign("reservation_id")
         .references("reservation_id")
         .inTable("reservations")
         .onDelete("CASCADE")
    table.boolean("status").defaultTo(false)
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};