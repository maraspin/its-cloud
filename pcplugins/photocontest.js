async function routes (fastify, options) {

  const db = fastify.pg
  const user = fastify.user


  fastify.get('/', async (request, reply) => {

  	// db.connect()
  	const res = await db.query('SELECT * FROM tsac18_maraspin.images')
  	console.log(res)

	// const test = 'cao'
	const html = await fastify.view('/list.pug', {userid: user.id, name: user.username, res: res.rows} )
	// reply.view('/list.pug', { name: test})

	reply
	.header('Content-Type', 'text/html')
  	.type('text/html')
  	.code('200')
	.send(html)

	// db.end()

  })


  fastify.post('/vote', async (request, reply) => {
  	 const upd = await db.query('UPDATE tsac18_maraspin.images SET votes=votes+1, total=total + ' + request.params.score + ' WHERE id = ' + request.params.id )
	 const ins = await db.query('INSERT INTO tsac18_maraspin.votes (image_id, user_id, value) VALUES (' + request.params.score +',' + user.id + ',' + request.params.score +')')
	console.log('Rating given')
	 reply.redirect('/');
  })

  fastify.get('/ranking', async (request, reply) => {})

}

module.exports = routes
