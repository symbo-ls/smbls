#!/usr/bin/env node

import { execSync } from 'child_process'
import { program } from './program.js'

const packagesToLink = [
  'attrs-in-props',
  '@symbo.ls/cli',
  '@symbo.ls/convert',
  '@symbo.ls/create',
  'css-in-props',
  '@symbo.ls/default-config',
  '@symbo.ls/fetch',
  '@symbo.ls/emotion',
  '@symbo.ls/init',
  '@symbo.ls/scratch',
  'smbls',
  '@symbo.ls/socket-ui',
  '@symbo.ls/utils',
  '@symbo.ls/socket',
  '@symbo.ls/uikit',
  '@symbo.ls/react',
  '@symbo.ls/atoms',
  '@symbo.ls/accessories',
  '@symbo.ls/avatar',
  '@symbo.ls/box',
  '@symbo.ls/button',
  '@symbo.ls/card',
  '@symbo.ls/chat',
  '@symbo.ls/datepicker',
  '@symbo.ls/checkbox',
  '@symbo.ls/dialog',
  '@symbo.ls/dropdown',
  '@symbo.ls/editorjs',
  '@symbo.ls/form',
  '@symbo.ls/field',
  '@symbo.ls/google-maps',
  '@symbo.ls/helmet',
  '@symbo.ls/icon',
  '@symbo.ls/indicator',
  '@symbo.ls/infoset',
  '@symbo.ls/input',
  '@symbo.ls/link',
  '@symbo.ls/list',
  '@symbo.ls/label',
  '@symbo.ls/markdown',
  '@symbo.ls/modal',
  '@symbo.ls/notification',
  '@symbo.ls/progress',
  '@symbo.ls/pills',
  '@symbo.ls/range',
  '@symbo.ls/search',
  '@symbo.ls/select',
  '@symbo.ls/slidetabs',
  '@symbo.ls/sidebar',
  '@symbo.ls/slider',
  '@symbo.ls/steps',
  '@symbo.ls/tab',
  '@symbo.ls/textcomponents',
  '@symbo.ls/table',
  '@symbo.ls/textarea',
  '@symbo.ls/threejs',
  '@symbo.ls/timepicker',
  '@symbo.ls/titleparagraph',
  '@symbo.ls/tooltip',
  '@symbo.ls/upload',
  '@symbo.ls/unitvalue',
  '@symbo.ls/video',
  '@symbo.ls/default-icons',
  '@symbo.ls/feather-icons',
  '@symbo.ls/material-icons',
  '@symbo.ls/fluent-icons',
  '@symbo.ls/react-atoms',
  '@symbo.ls/react-box',
  '@symbo.ls/react-button',
  '@symbo.ls/react-icon',
  '@symbo.ls/react-provider',
  '@symbo.ls/react-tooltip'
  // Add all your package names here,
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
