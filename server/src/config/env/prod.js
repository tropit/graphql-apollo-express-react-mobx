export default {
  env: 'production',
  graphql: { port: process.env.GRAPHQL_PORT || 5000 },
  db: {
    mongo: {
      host: 'localhost',
      port: 27017,
      db: 'boilerplate',
    },
  },
  logger: { level: process.env.LOGGER_LEVEL || 'info' },
}