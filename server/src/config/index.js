import merge from 'deepmerge'

import './init'
import dev from './env/dev'
import local from './env/local'
import prod from './env/prod'
import test from './env/test'

const isDev = process.env.NODE_ENV === 'development'
const isLocal = process.env.NODE_LOCATION === 'local'
const isTest = process.env.NODE_ENV === 'test'


export default merge.all([
  prod,
  isDev ? dev : {},
  isTest ? test : {},
  isLocal ? local : {},
])