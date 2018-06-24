import mongoose from 'mongoose'

export default (dbConfig) => new Promise((resolve, reject) => {
  mongoose.Promise = Promise
  mongoose.connection
    .on('error', reject)
    .on('close', () => resolve(mongoose.connections[0]))
    .on('open', () => resolve(mongoose.connections[0]))
  mongoose.connect(`mongodb://${ dbConfig.host }:${ dbConfig.port }/${ dbConfig.db }`,
    { useMongoClient: true })
})