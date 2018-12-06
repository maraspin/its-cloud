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
  	 console. log(request.body)
  	 const q1 = 'UPDATE tsac18_maraspin.images SET votes=votes+1, total=total + ' + request.body.rating + ' WHERE id = ' + request.body.id
  	 console. log(q1)
  	 const upd = await db.query(q1)
  	 const q2 = 'INSERT INTO tsac18_maraspin.votes (image_id, user_id, value) VALUES (' + request.body.id +',' + user.id + ',' + request.body.rating +')'
	 console. log(q2)
	 const ins = await db.query(q2)
	 console.log('Rating given')
	 reply.redirect('/');
  })


  fastify.get('/ranking', async (request, reply) => {})


}

module.exports = routes
