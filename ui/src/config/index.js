import merge from 'deepmerge'

import dev from './env/dev'
import local from './env/local'
import prod from './env/prod'
import test from './env/test'

const host = window.location.hostname

const NODE_ENV = process.env.NODE_ENV
const ENV_LOCATION = process.env.ENV_LOCATION

const isDev = NODE_ENV === 'development'
const isLocal = ENV_LOCATION === 'local'
const isTest = NODE_ENV === 'test'


export default merge.all([
  prod(host),
  isDev ? dev(host) : {},
  isTest ? test : {},
  isLocal ? local(host) : {},
])