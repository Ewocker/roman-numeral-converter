import Koa from 'koa'
import Accesslog from 'koa-accesslog'
import Boom from 'boom'

import router from './router'

const server = new Koa()

server
	.use(Accesslog()) // NCSA Common Log Format
	.use(router.routes())
	.use(router.allowedMethods({ // Not useful but future proof
		throw: true,
		notImplemented: () => new Boom.notImplemented(),
		methodNotAllowed: () => new Boom.methodNotAllowed()
	}))
	.listen(8080)