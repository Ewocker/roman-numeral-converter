import Koa from 'koa'
import Accesslog from 'koa-accesslog'
import Boom from 'boom'
import cors from 'koa2-cors'

import apiRouter from './route/api'
import metricRouter from './route/metric'
import metric from './model/metric'

const server = new Koa()

server
	.use(metric.httpRequestDurationMicrosecondsMiddleware())
	.use(cors())
	.use(Accesslog()) // NCSA Common Log Format
	.use(apiRouter.routes())
	.use(apiRouter.allowedMethods({ // Not useful now but future proof
		throw: true,
		notImplemented: () => new Boom.notImplemented(),
		methodNotAllowed: () => new Boom.methodNotAllowed()
	}))
	.use(metricRouter.routes())
	.listen(8080)