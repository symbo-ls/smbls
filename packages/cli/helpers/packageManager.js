'use strict'

import fs from 'fs'
import path from 'path'
import { execSync, spawnSync } from 'child_process'

/**
 * Detect the runtime from config files and lockfiles.
 * Returns 'bun' | 'deno' | 'node'
 */
export function detectRuntime (cwd = process.cwd()) {
  if (fs.existsSync(path.join(cwd, 'deno.json')) || fs.existsSync(path.join(cwd, 'deno.jsonc'))) return 'deno'
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun'
  return 'node'
}

/**
 * Detect the package manager from symbols.json, then lockfiles, then fallback to npm.
 * Returns 'npm' | 'yarn' | 'pnpm' | 'bun' | 'deno'
 */
export function detectPackageManager (cwd = process.cwd()) {
  try {
    const symbolsPath = path.join(cwd, 'symbols.json')
    if (fs.existsSync(symbolsPath)) {
      const { packageManager } = JSON.parse(fs.readFileSync(symbolsPath, 'utf8'))
      if (packageManager) return packageManager
    }
  } catch {}

  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun'
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm'

  return 'npm'
}

/**
 * Check if a binary exists on PATH.
 */
export function binaryExists (name) {
  try {
    execSync(`which ${name}`, { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

/**
 * Run package install for the given package manager in cwd.
 * Uses spawnSync so output streams to the terminal.
 */
export function runInstall (pm, cwd = process.cwd()) {
  const commands = {
    npm: ['npm', ['install']],
    yarn: ['yarn', []],
    pnpm: ['pnpm', ['install']],
    bun: ['bun', ['install']],
    deno: ['deno', ['install']]
  }
  const [cmd, args] = commands[pm] || commands.npm
  return spawnSync(cmd, args, { stdio: 'inherit', cwd })
}
