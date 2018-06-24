import { Logger, transports } from 'winston'
import toYAML from 'winston-console-formatter'

import config from '../config'

const logger = new Logger({ level: config.logger.level })

// if (process.env.NODE_ENV !== 'production')
logger.add(transports.Console, toYAML.config())

export default logger