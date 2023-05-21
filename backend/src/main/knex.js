const knex = require('knex')({
    client: 'mysql',
    version: '8.0',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'root',
      database : 'test'
    }
});

module.exports = knex;