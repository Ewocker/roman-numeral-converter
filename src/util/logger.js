import simpleNodeLogger from 'simple-node-logger'
import config from '../config'

const log = simpleNodeLogger.createSimpleLogger()
log.setLevel(config.logLevel)

export default log