import Router from 'koa-router'
import { romanNumeralHandler } from '../api'

const router = new Router()

router.all('/romannumeral', async (ctx, next) => {
	ctx.body = JSON.stringify(await romanNumeralHandler(ctx.request.query), null, 2)
})

export default router