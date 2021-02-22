const configs = {
	'default': {
		name: 'roman-numeral-convertor',
  	redisURL: 'redis://127.0.0.1:6379',
		enableRedisCache: false,
		cacheSyncInterval: 5000,
	},
	'local': {},
	'local-redis': {
		enableRedisCache: true,
	},
	'docker-compose': {
		enableRedisCache: true,
		cacheSyncInterval: 60000 // 1 minute
	},
	'kubernetes': {
  	redisURL: 'redis://redis-cache:6379',
		enableRedisCache: true,
		cacheSyncInterval: 60000 // 1 minute
	}
}

// override default
const config = Object.assign(configs.default, configs[process.env.NODE_ENV])
export default config