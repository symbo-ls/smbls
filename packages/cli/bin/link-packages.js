#!/usr/bin/env node

import { execSync } from 'child_process'
import { program } from './program.js'

const packagesToLink = [
  'attrs-in-props',
  '@symbo.ls/cli',
  '@symbo.ls/create',
  '@symbo.ls/convert',
  'css-in-props',
  '@symbo.ls/default-config',
  '@symbo.ls/emotion',
  '@symbo.ls/fetch',
  '@symbo.ls/init',
  'smbls',
  '@symbo.ls/scratch',
  '@symbo.ls/socket-ui',
  '@symbo.ls/socket',
  '@symbo.ls/utils',
  '@symbo.ls/uikit',
  '@symbo.ls/react',
  '@symbo.ls/atoms',
  '@symbo.ls/avatar',
  '@symbo.ls/box',
  '@symbo.ls/board',
  '@symbo.ls/button',
  '@symbo.ls/chat',
  '@symbo.ls/card',
  '@symbo.ls/checkbox',
  '@symbo.ls/datepicker',
  '@symbo.ls/dialog',
  '@symbo.ls/dropdown',
  '@symbo.ls/editorjs',
  '@symbo.ls/doublehr',
  '@symbo.ls/field',
  '@symbo.ls/form',
  '@symbo.ls/google-maps',
  '@symbo.ls/helmet',
  '@symbo.ls/icon',
  '@symbo.ls/indicator',
  '@symbo.ls/input',
  '@symbo.ls/label',
  '@symbo.ls/link',
  '@symbo.ls/list',
  '@symbo.ls/markdown',
  '@symbo.ls/modal',
  '@symbo.ls/notification',
  '@symbo.ls/paragraphbutton',
  '@symbo.ls/range',
  '@symbo.ls/progress',
  '@symbo.ls/pills',
  '@symbo.ls/select',
  '@symbo.ls/sidebar',
  '@symbo.ls/slider',
  '@symbo.ls/sociallink',
  '@symbo.ls/steps',
  '@symbo.ls/tab',
  '@symbo.ls/table',
  '@symbo.ls/titleparagraph',
  '@symbo.ls/timepicker',
  '@symbo.ls/threejs',
  '@symbo.ls/unitvalue',
  '@symbo.ls/tooltip',
  '@symbo.ls/upload',
  '@symbo.ls/user',
  '@symbo.ls/video',
  '@symbo.ls/default-icons',
  '@symbo.ls/feather-icons',
  '@symbo.ls/fluent-icons',
  '@symbo.ls/material-icons',
  '@symbo.ls/react-atoms',
  '@symbo.ls/react-box',
  '@symbo.ls/react-button',
  '@symbo.ls/react-icon',
  '@symbo.ls/react-provider',
  '@symbo.ls/react-tooltip'
]

program
  .command('link-packages')
  .description('Run "yarn link" on specified packages')
  .action(() => {
    try {
      for (const packageName of packagesToLink) {
        console.log(`Linking ${packageName}...`)
        execSync(`yarn link ${packageName}`, { stdio: 'inherit' })
      }
      console.log('All packages linked successfully.')
    } catch (error) {
      console.error('Error linking packages:', error.message)
      process.exit(1)
    }
  })
