import fs from 'fs'
import path from 'path'

function isPlainObject(val) {
  return !!val && typeof val === 'object' && !Array.isArray(val)
}

export function findNearestPackageJson(startDir = process.cwd()) {
  let cur = path.resolve(startDir)
  for (let i = 0; i < 50; i++) {
    const candidate = path.join(cur, 'package.json')
    if (fs.existsSync(candidate)) return candidate
    const parent = path.dirname(cur)
    if (parent === cur) break
    cur = parent
  }
  return null
}

export function readPackageJson(packageJsonPath) {
  try {
    const raw = fs.readFileSync(packageJsonPath, 'utf8')
    const parsed = JSON.parse(raw)
    return isPlainObject(parsed) ? parsed : null
  } catch (_) {
    return null
  }
}

export function writePackageJson(packageJsonPath, json) {
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2) + '\n')
    return true
  } catch (_) {
    return false
  }
}

export function getPackageDependencies(packageJsonPath) {
  const pkg = readPackageJson(packageJsonPath)
  if (!pkg) return {}
  const deps = isPlainObject(pkg.dependencies) ? pkg.dependencies : {}
  return { ...deps }
}

function sortObjectKeys(obj) {
  if (!isPlainObject(obj)) return obj
  const out = {}
  Object.keys(obj).sort().forEach((k) => {
    out[k] = obj[k]
  })
  return out
}

/**
 * Merge dependency map into package.json dependencies.
 * - If overwriteExisting is true, remote versions win.
 * - If false, only missing deps are added.
 */
export function syncPackageJsonDependencies(packageJsonPath, depsMap, { overwriteExisting = true } = {}) {
  if (!packageJsonPath) return { ok: false, reason: 'missing_package_json_path' }
  const pkg = readPackageJson(packageJsonPath)
  if (!pkg) return { ok: false, reason: 'invalid_package_json' }
  if (!isPlainObject(depsMap) || !Object.keys(depsMap).length) {
    return { ok: true, changed: false }
  }

  const existing = isPlainObject(pkg.dependencies) ? { ...pkg.dependencies } : {}
  let changed = false

  for (const [name, ver] of Object.entries(depsMap)) {
    if (typeof name !== 'string' || !name) continue
    if (typeof ver !== 'string' || !ver) continue
    if (!Object.prototype.hasOwnProperty.call(existing, name)) {
      existing[name] = ver
      changed = true
      continue
    }
    if (overwriteExisting && existing[name] !== ver) {
      existing[name] = ver
      changed = true
    }
  }

  if (!changed) return { ok: true, changed: false }
  pkg.dependencies = sortObjectKeys(existing)
  const ok = writePackageJson(packageJsonPath, pkg)
  return { ok, changed: ok }
}

/**
 * Apply a dependency patch to package.json:
 * - upsert: add/update these dependencies
 * - remove: delete these dependency keys if present
 *
 * This intentionally only touches `dependencies` (not devDependencies/peerDependencies).
 */
export function patchPackageJsonDependencies(
  packageJsonPath,
  { upsert = {}, remove = [], overwriteExisting = true } = {}
) {
  if (!packageJsonPath) return { ok: false, reason: 'missing_package_json_path' }
  const pkg = readPackageJson(packageJsonPath)
  if (!pkg) return { ok: false, reason: 'invalid_package_json' }

  const existing = isPlainObject(pkg.dependencies) ? { ...pkg.dependencies } : {}
  let changed = false

  if (Array.isArray(remove) && remove.length) {
    for (let i = 0; i < remove.length; i++) {
      const name = remove[i]
      if (typeof name !== 'string' || !name) continue
      if (Object.prototype.hasOwnProperty.call(existing, name)) {
        delete existing[name]
        changed = true
      }
    }
  }

  if (isPlainObject(upsert) && Object.keys(upsert).length) {
    for (const [name, ver] of Object.entries(upsert)) {
      if (typeof name !== 'string' || !name) continue
      if (typeof ver !== 'string' || !ver) continue
      if (!Object.prototype.hasOwnProperty.call(existing, name)) {
        existing[name] = ver
        changed = true
        continue
      }
      if (overwriteExisting && existing[name] !== ver) {
        existing[name] = ver
        changed = true
      }
    }
  }

  if (!changed) return { ok: true, changed: false }
  pkg.dependencies = sortObjectKeys(existing)
  const ok = writePackageJson(packageJsonPath, pkg)
  return { ok, changed: ok }
}

function ensureSchemaContainer(project) {
  if (!project || typeof project !== 'object') return null
  if (!isPlainObject(project.schema)) project.schema = {}
  return project.schema
}

export function ensureSchemaDependencies(project) {
  if (!project || typeof project !== 'object') return project
  const deps = isPlainObject(project.dependencies) ? project.dependencies : null
  if (!deps) return project

  const schema = ensureSchemaContainer(project)
  if (!isPlainObject(schema.dependencies)) schema.dependencies = {}

  for (const [name, ver] of Object.entries(deps)) {
    if (typeof name !== 'string' || !name) continue
    const version = typeof ver === 'string' && ver.length ? ver : 'latest'
    const existing = schema.dependencies[name]
    if (isPlainObject(existing)) {
      if (typeof existing.key !== 'string') existing.key = name
      if (typeof existing.type !== 'string') existing.type = 'dependency'
      if (typeof existing.version !== 'string') existing.version = version
      if (typeof existing.resolvedVersion !== 'string') existing.resolvedVersion = version
      if (typeof existing.status !== 'string') existing.status = 'done'
    } else {
      schema.dependencies[name] = {
        key: name,
        resolvedVersion: version,
        type: 'dependency',
        version,
        status: 'done'
      }
    }
  }
  return project
}

/**
 * Augment a project object with local package.json dependencies so sync/collab
 * can detect and push dependency additions/updates.
 */
export function augmentProjectWithLocalPackageDependencies(project, packageJsonPath) {
  if (!project || typeof project !== 'object') return project
  if (!packageJsonPath) return project
  const pkgDeps = getPackageDependencies(packageJsonPath)
  if (!Object.keys(pkgDeps).length) return project

  // Some build outputs expose getters-only exports (e.g. Babel interop / CJS wrappers).
  // Avoid mutating such objects by cloning into a plain, extensible object.
  let target = project
  try {
    const desc = Object.getOwnPropertyDescriptor(target, 'dependencies')
    const canAssign =
      !desc ||
      desc.writable === true ||
      typeof desc.set === 'function'
    if (!canAssign || !Object.isExtensible(target)) {
      target = { ...target }
    }
  } catch (_) {
    target = { ...target }
  }

  const existing = isPlainObject(target.dependencies) ? target.dependencies : {}
  const merged = { ...existing, ...pkgDeps }

  try {
    target.dependencies = merged
  } catch (_) {
    try {
      Object.defineProperty(target, 'dependencies', {
        value: merged,
        enumerable: true,
        configurable: true,
        writable: true
      })
    } catch (_) {}
  }

  ensureSchemaDependencies(target)
  return target
}


