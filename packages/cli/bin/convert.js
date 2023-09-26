'use strict'

import { program } from './program.js'
import { CLIconvert } from '@symbo.ls/convert/index.js'

const TMP_DIR_NAME = '.smbls_convert_tmp'

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
  .action(CLIconvert)
