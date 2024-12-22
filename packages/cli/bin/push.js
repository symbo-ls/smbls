#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { loadModule } from './require.js'
import { program } from './program.js'
import { update, getAllItems } from '@symbo.ls/sdk'
import * as utils from '@domql/utils'

const { deepStringify } = utils

import { createPatch } from 'diff'

const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH =
  process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'

let rc = {}
try {
  rc = loadModule(RC_PATH); // eslint-disable-line
} catch (e) {
  console.error('Please include symbols.json to your root of respository')
}

export async function pushLocalFile () {
  await rc.then(async (data) => {
    const { key, framework, distDir, metadata } = data
    let bodyString, originalBody
    try {
      originalBody = await getAllItems()

      if (!distDir) {
        try {
          bodyString = await fs.readFileSync(LOCAL_CONFIG_PATH)

          console.log(chalk.bold.green('\nSuccessfully read file'))
        } catch (e) {
          console.log(chalk.bold.red('\nError reading file'))
          return {}
        }

        console.log()
        console.warn('No --dist-dir option or "distDir" in symbols.json provided. Reading in ./node_modules/@symbo.ls/init/dynamic.json.')
      } else {
        bodyString = await readFs(distDir)
      }

      if (!bodyString) return

      let diffs;
      if (JSON.stringify(originalBody) !== bodyString) {
        diffs = JSON.parse(createPatch(key, bodyString, JSON.stringify(originalBody)))
      }

      if (!diffs) return {}

      const updatedArrData = Object.keys(diffs).map(diff => (Object.keys(diffs[diff]).map(key => (['update', [diff, key], diffs[diff][key]]))))
      let updatedData = []
      updatedArrData.forEach(item => updatedData.concat([...item]))
      await update(deepStringify(updatedData))
    } catch (e) {
      console.log(chalk.bold.red('\nError getting from server'))
      return {}
    }
  })
}

program.command('push').description('Push changes to platform').action(pushLocalFile)
