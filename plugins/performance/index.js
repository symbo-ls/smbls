'use strict'

import { window } from '@domql/utils'

const OPTIONS = {
  logLevel: 4
}

const logMeasure = (key, diff, level) => {
  console.group('measure', key)
  if (level === 'error') console.error(diff)
  else if (level === 'warn') console.warn(diff)
  else console.log(diff)
  console.groupEnd()
}

export const measure = (key, func, options = OPTIONS) => {
  const perf = window.performance.now()
  func(perf)
  const diff = window.performance.now() - perf
  if (diff > 200 && options.logLevel > 0) logMeasure(key, diff, 'error')
  else if (diff > 100 && options.logLevel > 1) logMeasure(key, diff, 'warn')
  else if (diff > 35 && options.logLevel > 2) logMeasure(key, diff, 'log')
  else if (diff > 10 && options.logLevel > 3) logMeasure(key, diff, 'log')
  else if (diff > 0 && options.logLevel > 4) logMeasure(key, diff, 'log')
}

export const measurePromise = async (key, func, options = OPTIONS) => {
  const perf = window.performance.now()
  await func(perf)
  const diff = window.performance.now() - perf
  if (diff > 200 && options.logLevel > 0) logMeasure(key, diff, 'error')
  else if (diff > 100 && options.logLevel > 1) logMeasure(key, diff, 'warn')
  else if (diff > 35 && options.logLevel > 2) logMeasure(key, diff, 'log')
  else if (diff > 10 && options.logLevel > 3) logMeasure(key, diff, 'log')
  else if (diff > 0 && options.logLevel > 4) logMeasure(key, diff, 'log')
}
