const configs = {
	local: {
  	redisURL: 'redis://127.0.0.1:6379',
		enableRedisCache: true,
		cacheSyncInterval: 5000
	}
}

const config = configs[process.env.NODE_ENV]
export default config