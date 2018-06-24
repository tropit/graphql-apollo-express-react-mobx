import path from 'path'

import fs from 'fs-extra'

import config from '../config'
import logger from '../lib/logger'

const connectDB = async (dbName, dbConfig) => {
  if (!dbName || !dbConfig) throw new Error('db configuration or name is missing')
  const connect = await require(`./${ dbName }`)
  const info = await connect.default(dbConfig)
  logger.info(`Connected to ${ info.host }:${ info.port }/${ info.name } as ${ dbName.replace('.db.js', '') } database`)
}

(async () => {
  const dbs = (await fs.readdir(path.join(__dirname, './'))).filter((fileName) => fileName.endsWith('.db.js'))
  try {
    await Promise.all(dbs.map((dbName) => connectDB(dbName, config.db[dbName.replace('.db.js', '')])))
  } catch (e) {
    return logger.error(e)
  }
  logger.info('all databases are connected.')
})()