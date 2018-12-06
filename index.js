'use strict'

require('make-promises-safe')

// Configuration is loaded
const config = require('./configuration/conf.js');

console.log(config);

// Router
const fastify = require('fastify')({
  logger: true
})

// Views
fastify.register(require('point-of-view'), {
  engine: {
    pug: require('pug')
  },
  templates: 'templates',
  options:{
	basedir: 'templates/includes'
  }
})

fastify.register(require('fastify-formbody'))

// DB Connection
fastify.register(require('./pcplugins/dbconn'), {
  dsn: config.db.dsn
})

// User Management
fastify.register(require('./pcplugins/users'));

fastify.register(require('./pcplugins/photocontest'));

// App is loaded
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
