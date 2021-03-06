import Redis from 'async-redis'
import config from '../config'
import metric from './metric'
import log from '../util/logger'

class Cache {
	constructor() {
		this.map = {}
		if (config.enableRedisCache) {
			// insert all existing cache
			this.client = Redis.createClient(config.redisURL)
			this.client.on('error', err => {
				metric.custom.cacheErrorCounter.inc({ errcode: err.code })
				log.error(err)
			})
			this.sync()

			if (config.cacheSyncInterval) setInterval(() => this.sync(), config.cacheSyncInterval)
		}
	}

	async get(key) {
		let val = this.map[key]
		if (val) return val
		if (!config.enableRedisCache) return val
		try {
			val = await this.client.get(key)
			if (val) log.debug(`cache hit from redis for key ${key}`)
		} catch (err) {
			log.error(err)
		}
		return val
	}

	async set(key, val) {
		this.map[key] = val

		if (!config.enableRedisCache) return
		try {
			// await here only in case caller wants to wait
			await this.client.set(key, val)
			// TDOD debug level, metrics
			log.debug(`cache inserted to redis for key ${key}`)
		} catch (err) {
			log.error(err)
		}
	}

	async sync() {
		try {
			const keys = await this.client.keys('*')
			for (let k of keys) {
				if (!(k in this.map)) this.map[k] = await this.client.get(k)
			}
			metric.custom.cacheSyncCounter.inc()
		} catch (err) {
			metric.custom.cacheErrorCounter.inc({ errcode: error.code })
			log.error(err)
		}
		
		log.info(`sync cache from redis to in-mem cache for ${Object.keys(this.map).length} keys`)
	}
}

const instance = new Cache()
Object.freeze(instance)

export default instance