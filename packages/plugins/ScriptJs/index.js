'use strict'

import scriptjs from 'scriptjs'

export default {
  $: scriptjs,
  $getPackage: (pkgName, callback) => scriptjs('https://cdn.jsdelivr.net/npm/' + pkgName, callback)
}
