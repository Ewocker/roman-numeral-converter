import Router from 'koa-router'
import metric from '../model/metric'
import log from '../util/logger'

const router = new Router()

router.get('/metrics', async (ctx, next) => {
	ctx.set('Content-Type', metric.register.contentType)
	try {
		ctx.body = await metric.register.metrics()
	} catch (err) {
		log.error(`fail to get metrics with error ${err}`)
		ctx.status = 500
		ctx.body = 'Internal Server Error: failed to get metrics'
	}
})

export default router