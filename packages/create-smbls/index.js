#!/usr/bin/env node

import 'v8-compile-cache'
import fs from 'fs'
import execa from 'execa'

async function createScriptAndClone (repoUrl, scriptName) {
  try {
    // Step 1: Add npm script to package.json
    const packageJsonPath = './package.json'
    const packageJson = require(packageJsonPath)

    // Check if the script name already exists
    if (packageJson.scripts && packageJson.scripts[scriptName]) {
      console.log(`Script "${scriptName}" already exists in package.json.`)
      return
    }

    packageJson.scripts = packageJson.scripts || {}
    packageJson.scripts[scriptName] = `git clone ${repoUrl} .`

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log(`Added npm script "${scriptName}" to package.json`)

    // Step 2: Clone repository
    await execa('npm', ['install']) // Install dependencies (optional)
    await execa('npm', ['run', scriptName]) // Run the script
    console.log('Repository cloned successfully.')
  } catch (error) {
    console.error('Error:', error)
  }
}

// Example usage:
const repoUrl = 'https://github.com/symbo.ls/starter-kit.git'
const scriptName = 'smbls'

createScriptAndClone(repoUrl, scriptName)
