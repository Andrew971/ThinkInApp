exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('FoUsers', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('foUser_id').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('foUser_id').references('id').inTable('users');
    table.foreign('user_id').references('id').inTable('users');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('FoUsers') // drop table when reverting
};
