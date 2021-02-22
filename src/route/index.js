import Router from 'koa-router'
import { romanNumeralHandler } from '../api'
import metric from '../model/metric'

const router = new Router()

router.all('/romannumeral', async (ctx, next) => {
	// TODO wrap metric as middleware
	const end = metric.custom.httpRequestDurationMicroseconds.startTimer()

	ctx.body = JSON.stringify(await romanNumeralHandler(ctx.request.query), null, 2)

	end({ route: ctx.path, code: ctx.status, method: ctx.method })
})

router.get('/metrics', async (ctx, next) => {
	const end = metric.custom.httpRequestDurationMicroseconds.startTimer()

	ctx.set('Content-Type', metric.register.contentType)
	ctx.body = await metric.register.metrics()

	end({ route: ctx.path, code: ctx.status, method: ctx.method })
})

export default router