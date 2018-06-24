import 'babel-polyfill'
import 'isomorphic-fetch'

import config from './config'
import './database'
import logger from './lib/logger'
import app from './app'

const PORT = config.graphql.port

app.listen(PORT, () => {
  logger.info('Server is listening on', PORT)
})