exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('forums', table => {
    table.increments('id').primary();
    table.string('Name').unique().notNullable();
    table.string('Subject').notNullable();
    table.string('Description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();

    table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('forums') // drop table when reverting
};
