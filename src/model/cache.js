import Redis from 'async-redis'
import config from '../config'

const client = Redis.createClient(config.redisURL)

// client.on('error', function(error) {
// 	console.error(error)
// })
 
// client.set('key', 'value', redis.print)
// client.get('key', redis.print)

class Cache {
	constructor() {
		this.map = {}
		if (config.enableRedisCache) {
			// insert all existing cache
			this.sync()
			if (config.cacheSyncInterval) setInterval(() => this.sync(), config.cacheSyncInterval)
		}
	}

	async get(key) {
		let val = this.map[key]
		if (val) return val
		try {
			val = await client.get(key)
			// TDOD debug level, metrics
			if (val) console.log(`cache hit from redis for key ${key}`)
		} catch (err) {
			console.error(err)
		}
		return val
	}

	async set(key, val) {
		this.map[key] = val
		try {
			// await here only in case caller wants to wait
			await client.set(key, val)
			// TDOD debug level, metrics
			console.log(`cache inserted to redis for key ${key}`)
		} catch (err) {
			console.error(err)
		}
	}

	async sync() {
		try {
			const keys = await client.keys('*')
			for (let k of keys) {
				if (!(k in this.map)) this.map[k] = await client.get(k)
			}
		} catch (err) {
			console.error(err)
		}
		// TODO debug level, metrics
		console.log(`sync cache from redis to in-mem cache for ${Object.keys(this.map).length} keys`)
	}
}

const instance = new Cache()
Object.freeze(instance)

export default instance