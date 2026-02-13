// Shared project-shape normalization helpers used before diffing/transport.

export function stripEmptyDefaultNamespaceEntries (project) {
  // When bundling ESM `export * as X` into CJS, the module namespace can appear
  // as `{ default: {} }` when there are no real exports. We should not treat
  // that as a real `*.default` entry to push/sync over the platform.
  if (!project || typeof project !== 'object') return project

  const SECTIONS = ['functions', 'methods', 'snippets', 'pages', 'components', 'files', 'dependencies']
  for (let i = 0; i < SECTIONS.length; i++) {
    const sectionKey = SECTIONS[i]
    const section = project[sectionKey]
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue
    if (!Object.prototype.hasOwnProperty.call(section, 'default')) continue

    const def = section.default
    const defIsEmptyObject =
      def &&
      typeof def === 'object' &&
      !Array.isArray(def) &&
      Object.keys(def).length === 0

    if (defIsEmptyObject) {
      // Some module namespace objects (or frozen objects) have a non-configurable
      // `default` property, so `delete section.default` throws in strict mode.
      // In that case, clone into a plain object without `default` and replace.
      try {
        const desc = Object.getOwnPropertyDescriptor(section, 'default')
        const canDelete = !desc || desc.configurable
        if (canDelete) {
          delete section.default
        } else {
          throw new TypeError('Non-configurable default')
        }
      } catch (_) {
        const clone = {}
        const keys = Object.getOwnPropertyNames(section)
        for (let j = 0; j < keys.length; j++) {
          const k = keys[j]
          if (k === 'default') continue
          clone[k] = section[k]
        }
        try {
          project[sectionKey] = clone
        } catch (_) {
          // If project is unexpectedly immutable, leave it as-is.
        }
      }

      const updatedSection = project[sectionKey]
      if (
        updatedSection &&
        typeof updatedSection === 'object' &&
        !Array.isArray(updatedSection) &&
        Object.keys(updatedSection).length === 0
      ) {
        try {
          delete project[sectionKey]
        } catch (_) {
          // ignore
        }
      }
    }
  }

  return project
}
