exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('labs', table => {
    table.increments('id').primary();
    table.string('Title').unique().notNullable();
    table.string('Subject').notNullable();
    table.string('Blog').notNullable();
    table.string('Path').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable();
    table.integer('forum_id').unsigned().notNullable();

    table.foreign('forum_id').references('id').inTable('forums');
    table.foreign('user_id').references('id').inTable('users');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('labs') // drop table when reverting
};
