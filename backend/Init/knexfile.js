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
    client: 'pg',
    connection:'postgres://rirgskibkpdwld:5570660e539ef90750cd45bb4fc4739e370b3817fb25dd648857cc999195d856@ec2-54-83-192-68.compute-1.amazonaws.com:5432/d83nsp95pprqp6',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
