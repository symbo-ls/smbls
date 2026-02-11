// Shared project-shape normalization helpers used before diffing/transport.

export function stripEmptyDefaultNamespaceEntries (project) {
  // When bundling ESM `export * as X` into CJS, the module namespace can appear
  // as `{ default: {} }` when there are no real exports. We should not treat
  // that as a real `*.default` entry to push/sync over the platform.
  if (!project || typeof project !== 'object') return project

  const SECTIONS = ['functions', 'methods', 'snippets']
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
      delete section.default
      if (Object.keys(section).length === 0) delete project[sectionKey]
    }
  }

  return project
}
