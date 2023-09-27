'use strict'

import chalk from 'chalk'
import { program } from './program.js'
import * as smblsconvert from '@symbo.ls/convert'

const { convert, convertDomqlModule } = smblsconvert.default
const TMP_DIR_NAME = '.smbls_convert_tmp'

export function convertFromCli (data, opts) {
  const { framework, verbose, verboseCode } = opts
  console.log(chalk.dim('\n----------------\n'))
  console.log('Converting components to', chalk.bold(framework))
  const convertedStrings = convertDomqlModule(data, null, framework)
  if (verboseCode) console.log(convertedStrings)
  console.log(chalk.bold.green('\nSuccessfully converted'))
  return verbose
}

program
  .command('convert')
  .description('Convert and copy all DomQL components under a directory')
  .argument('[src]', 'Source directory/file. By default, it is "src/"')
  .argument('[dest]',
    'Destination directory/file. Will be overwritten. By ' +
            'default, it becomes the name of the desired format')
  .option('--react', 'Convert all DomQL components to React')
  .option('--angular', 'Convert all DomQL components to Angular')
  .option('--vue2', 'Convert all DomQL components to Vue2')
  .option('--vue3', 'Convert all DomQL components to Vue3')
  .option('-t, --tmp-dir <path>',
    'Use this directory for storing intermediate & build files instead of ' +
          `the default (dest/${TMP_DIR_NAME})`)
  .option('-o, --only <components>',
    'Only convert these components; comma separated ' +
          '(for example: --only=Flex,Img)')
  .option('-m, --merge <dir>',
    'After converting an entire directory, perform a recursive merge that takes files from this directory and puts them in the dest directory. It also concatenates index.js files')
  .option('--internal-uikit',
    '(For internal use only). ' +
          'Excludes particular components from the conversion')
  .action(convert)
