import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { print } from 'graphql/language'

import logger from './lib/logger'
import * as loaders from './loader'
import schema from './schema/index'

const app = express()
app.use((req, res, next) => {
  let oneOf = false
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    oneOf = true
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'])
    oneOf = true
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
    oneOf = true
  }
  if (oneOf) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365)
  }

  // intercept OPTIONS method
  if (oneOf && req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

const graphqlSettingsPerReq = async () => ({
  // graphiql: config.mode !== 'production',
  schema,
  context: { loaders },
  extensions: ({ document, variables, result }) => {
    logger.debug(print(document))
    logger.debug(variables)
    logger.debug(result)
  },
  formatError: (error) => {
    logger.error(error.message)
    logger.error(error.locations)
    logger.error(error.stack)

    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack,
    }
  },
})

app.use(morgan('dev'))

const graphqlServer = graphqlExpress(graphqlSettingsPerReq)
app.get('/graphql', graphiqlExpress({ endpointURL: '/graphql' }))
app.use('/graphql', bodyParser.json(), graphqlServer)

export default app