exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('profiles', table => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('gender').notNullable();
    table.string('age').defaultTo('');
    table.string('bio').defaultTo('');
    table.string('link').defaultTo('');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();

    table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles') // drop table when reverting
};
