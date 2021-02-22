const configs = {
	'local': {
  	redisURL: 'redis://127.0.0.1:6379',
		enableRedisCache: false,
		cacheSyncInterval: 5000
	},
	'local-redis': {
  	redisURL: 'redis://127.0.0.1:6379',
		enableRedisCache: true,
		cacheSyncInterval: 5000
	},
	'docker-compose': {
  	redisURL: 'redis://127.0.0.1:6379',
		enableRedisCache: true,
		cacheSyncInterval: 60000 // 1 minute
	},
	'kubernetes': {
  	redisURL: 'redis://redis-cache:6379',
		enableRedisCache: true,
		cacheSyncInterval: 60000 // 1 minute
	}
}

const config = configs[process.env.NODE_ENV]
export default config