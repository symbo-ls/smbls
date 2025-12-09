'use strict'

import fs from 'fs'
import { createRequire } from 'module'
import path from 'path'

class ImportError extends Error {
  constructor(message, path, error) {
    super(message)
    this.name = 'ImportError'
    this.path = path
    this.originalError = error
  }
}

const require = createRequire(import.meta.url)

/**
 * Loads a module or file content based on file type and options
 * @param {string} modulePath - Path to the module/file to load
 * @param {Object} options - Configuration options
 * @param {boolean} options.json - Force JSON parsing
 * @param {boolean} options.raw - Return raw file contents
 * @param {string} options.encoding - File encoding (default: 'utf8')
 * @param {boolean} options.silent - Don't throw errors, return null instead
 * @param {boolean} options.noCache - Bust Node's require cache before loading
 * @returns {Promise<any>} - Loaded module/file contents
 */
export const loadModule = async (modulePath, options = {}) => {
  const {
    json = false,
    raw = false,
    encoding = 'utf8',
    silent = false,
    noCache = false
  } = options

  try {
    if (!fs.existsSync(modulePath)) {
      throw new ImportError(`File not found: ${modulePath}`, modulePath)
    }

    // Get file extension
    const ext = path.extname(modulePath)

    // Return raw file contents if requested
    if (raw) {
      return fs.readFileSync(modulePath, encoding)
    }

    // Handle JSON files or forced JSON parsing
    if (ext === '.json' || json) {
      const content = fs.readFileSync(modulePath, encoding)
      try {
        return JSON.parse(content)
      } catch (e) {
        throw new ImportError(
          `Invalid JSON in ${modulePath}: ${e.message}`,
          modulePath,
          e
        )
      }
    }

    // Handle JavaScript/Node modules
    try {
      if (noCache) {
        try {
          const resolved = require.resolve(modulePath)
          delete require.cache[resolved]
        } catch (_) {}
      }
      const module = require(modulePath)
      return module?.default || module
    } catch (e) {
      throw new ImportError(
        `Error loading module ${modulePath}: ${e.message}`,
        modulePath,
        e
      )
    }
  } catch (error) {
    if (silent) return null
    throw error
  }
}

/**
 * Synchronously loads a module or file content
 * @param {string} modulePath - Path to the module/file to load
 * @param {Object} options - Configuration options (same as loadModule)
 * @returns {any} - Loaded module/file contents
 */
export const loadModuleSync = (modulePath, options = {}) => {
  const {
    json = false,
    raw = false,
    encoding = 'utf8',
    silent = false,
    noCache = false
  } = options

  try {
    if (!fs.existsSync(modulePath)) {
      throw new ImportError(`File not found: ${modulePath}`, modulePath)
    }

    const ext = path.extname(modulePath)

    if (raw) {
      return fs.readFileSync(modulePath, encoding)
    }

    if (ext === '.json' || json) {
      const content = fs.readFileSync(modulePath, encoding)
      try {
        return JSON.parse(content)
      } catch (e) {
        throw new ImportError(
          `Invalid JSON in ${modulePath}: ${e.message}`,
          modulePath,
          e
        )
      }
    }

    try {
      if (noCache) {
        try {
          const resolved = require.resolve(modulePath)
          delete require.cache[resolved]
        } catch (_) {}
      }
      const module = require(modulePath)
      return module?.default || module
    } catch (e) {
      throw new ImportError(
        `Error loading module ${modulePath}: ${e.message}`,
        modulePath,
        e
      )
    }
  } catch (error) {
    if (silent) return null
    throw error
  }
}
