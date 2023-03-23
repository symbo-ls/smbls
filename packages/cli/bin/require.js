import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'

class ImportError extends Error {} /* Bring in the ability to create the 'require' method */ // eslint-disable-line
const require = createRequire(import.meta.url) // construct the require method

export const loadModule = async (modulePath) => {
  if (fs.existsSync(modulePath))
    return require(modulePath) // use the require method
  else
    return null
}
