exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('FoLabs', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('lab_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('lab_id').references('id').inTable('labs');
    table.foreign('user_id').references('id').inTable('users');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('FoLabs') // drop table when reverting
};
