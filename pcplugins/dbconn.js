const fastifyPlugin = require('fastify-plugin');
const pg = require('pg');

// const MongoClient = require('mongodb').MongoClient

async function dbConnector (fastify, options) {

  const connectionString = options.dsn
  delete options.dsn

  // const database = new pg.Client(connectionString);
  const client = new pg.Client(connectionString);

  client.connect()

  fastify.decorate('pg', client);

}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector)