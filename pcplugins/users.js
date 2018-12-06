const fastifyPlugin = require('fastify-plugin');

async function userProfile (fastify, options) {

  const user = 	{"id": 1, "username": "maraspin" };

  fastify.decorate('user', user);

}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(userProfile)