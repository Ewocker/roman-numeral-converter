import Router from 'koa-router'
import { romanNumeralHandler } from '../api'
import { accept } from '../util/koa'

const router = new Router()

router
	.use(accept())
	.all('/romannumeral', async (ctx, next) => {
		const [res, status] = await romanNumeralHandler(ctx.request.query)
		ctx.body = res
		ctx.status = status
	})

export default router