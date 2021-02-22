import Prom from 'prom-client'
import config from '../config'

class Metric {
	constructor() {
		this.register = new Prom.Registry()
		this.register.setDefaultLabels({ app: config.name })
		this.custom = {}
		Prom.collectDefaultMetrics({ register: this.register })
		this.registercustom()
	}

	registercustom() {
		this.custom.httpRequestDurationMicroseconds = new Prom.Histogram({
			name: 'http_request_duration_seconds',
			help: 'Duration of HTTP requests in microseconds',
			labelNames: ['method', 'route', 'code'],
			buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
		})
		this.custom.cacheSyncCounter = new Prom.Counter({
			name: 'cache_sync',
			help: 'Number of times cache sync occurs',
		})
		this.custom.cacheErrorCounter = new Prom.Counter({
			name: 'cache_error',
			help: 'Number of times cache errors',
			labelNames: ['errcode'],
		})

		this.register.registerMetric(this.custom.httpRequestDurationMicroseconds)
		this.register.registerMetric(this.custom.cacheSyncCounter)
		this.register.registerMetric(this.custom.cacheErrorCounter)
	}
}

const instance = new Metric()
Object.freeze(instance)

export default instance