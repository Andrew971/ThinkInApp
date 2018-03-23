// Update with your config settings.
require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'ThinkIn',
      user:     'andrewsordier',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection:'postgres://ujdinjfwmduekg:77033c9d4e482e54655af1d47ffe3ae03d6a28fbf6dbfe8ac2d4648a97f45091@ec2-54-204-44-140.compute-1.amazonaws.com:5432/ddia8lnl17t96s',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
