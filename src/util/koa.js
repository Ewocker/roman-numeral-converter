import Negotiator from 'negotiator'
import log from '../util/logger'

const AVAILABLE_TYPES = {
	'application/json': d => JSON.stringify(d, null, 2),
}

/**
 * accept is a koa middleware that takes care of request Accept Header and 
 *        set response Content-Type Header. 
 *        It returns 406 if not acceptable.
 *        It converts JSON to pretty for this project's requirement without
 *        having to provide query string pretty or similar settings.
 */
export const accept = () => {
	return async (ctx, next) => {
		const negotiator = new Negotiator(ctx)
		const mediaType = negotiator.mediaType(Object.keys(AVAILABLE_TYPES))

		if (mediaType === undefined) {
			log.debug(`none of client accept type is supported ${negotiator.mediaTypes()}`)
			ctx.status = 406
			ctx.body = '406 Not Acceptable'
			return 
		}

		await next()

		ctx.type = mediaType
		try {
			ctx.body = AVAILABLE_TYPES[mediaType](ctx.body)
		} catch (err) {
			log.error(`fail to parse return data for type ${mediaType} with error ${err}`)
			ctx.status = 500
			ctx.body = `Internal Server Error: failed to parse return data with Content-Type ${ctx.type}`
  	}
	}
} 