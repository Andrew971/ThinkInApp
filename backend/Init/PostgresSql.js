
// const environment =process.env.NODE_ENV || 'development';
// const config = require('./knexfile.js')[environment];
// const knex = require('knex')(config)

const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'ThinkIn',
    user:     'andrewsordier',
    password: 'password'
  }})


const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf