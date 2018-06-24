import path from 'path'

import dotenvSafe from 'dotenv-safe'

const root = path.join.bind(path, __dirname, '../../')

dotenvSafe.load({
  path: root('.env'),
  sample: root('.env.example'),
})