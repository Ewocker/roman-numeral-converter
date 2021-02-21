import Router from 'koa-router'
import { romanNumeralHandler } from '../api'

const router = new Router()

router.all('/romannumeral', (ctx, next) => {
	ctx.body = JSON.stringify(romanNumeralHandler(ctx.request.query), null, 2)
})

export default router