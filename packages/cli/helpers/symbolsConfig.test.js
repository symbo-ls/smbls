import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'path'

import {
  getConfiguredDistDirValue,
  resolveDistDir,
  setConfiguredDistDir
} from './symbolsConfig.js'

test('resolveDistDir uses symbols.json.distDir when present', () => {
  const cwd = path.join('/tmp', 'workspace')
  const distDir = resolveDistDir({ distDir: './generated' }, { cwd })

  assert.equal(distDir, path.join(cwd, 'generated'))
})

test('resolveDistDir falls back to legacy symbols.json.dir', () => {
  const cwd = path.join('/tmp', 'workspace')
  const distDir = resolveDistDir({ dir: './symbols' }, { cwd })

  assert.equal(distDir, path.join(cwd, 'symbols'))
})

test('resolveDistDir prefers explicit overrides over config values', () => {
  const cwd = path.join('/tmp', 'workspace')
  const distDir = resolveDistDir({ dir: './symbols', distDir: './generated' }, {
    cwd,
    distDirOverride: './override'
  })

  assert.equal(distDir, path.join(cwd, 'override'))
})

test('getConfiguredDistDirValue prefers distDir over legacy dir', () => {
  assert.equal(
    getConfiguredDistDirValue({ dir: './symbols', distDir: './generated' }),
    './generated'
  )
})

test('setConfiguredDistDir preserves legacy-only config shape', () => {
  assert.deepEqual(
    setConfiguredDistDir({ key: 'demo.symbo.ls', dir: './symbols' }, './next'),
    { key: 'demo.symbo.ls', dir: './next' }
  )
})

test('setConfiguredDistDir keeps both fields in sync when both already exist', () => {
  assert.deepEqual(
    setConfiguredDistDir(
      { key: 'demo.symbo.ls', dir: './symbols', distDir: './generated' },
      './next'
    ),
    { key: 'demo.symbo.ls', dir: './next', distDir: './next' }
  )
})
